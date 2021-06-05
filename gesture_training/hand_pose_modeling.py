#%% load dataset
# ========================================================================
import tensorflow as tf
import tensorflow.keras.layers as layers
from tensorflow.keras.regularizers import l2
import json

batch_size = 64

def getPoseName():
    pose = []
    with open('./datasets/hand_pose/pose_name.json') as file:
        pose = json.load(file)
    return pose

def load_data(split=0.9):
    pose = getPoseName()

    data = tf.io.read_file('./datasets/hand_pose/hand_pose.ds')
    data = tf.io.parse_tensor(data, tf.float32).numpy()
    ds = tf.data.Dataset.from_tensor_slices(data)

    def split_data(data):
        label = tf.one_hot(int(data[-1:][0]), len(pose))
        input = data[:-1]
        finger1 = input[:12]
        finger2 = input[12:24]
        finger3 = input[24:36]
        finger4 = input[36:48]
        finger5 = input[48:]
        input = (finger1, finger2, finger3, finger4, finger5)
        return input, label

    ds = ds.shuffle(buffer_size=len(ds), seed=123).map(split_data)
    splitIndex = int(len(ds) * split)
    ds_train = ds.take(splitIndex).batch(batch_size)
    ds_test = ds.skip(splitIndex).batch(batch_size)

    return ds_train, ds_test, pose

ds_train, ds_test, pose = load_data(split=0.8)


# %% train hand pose
# ===========================================================================
epochs = 80
learning_rate = 0.0008

def lr_decay(epoch):
    return learning_rate * 0.94 ** epoch
lr_cb = tf.keras.callbacks.LearningRateScheduler(lr_decay)

def create_model():
    x1 = layers.Input(shape=(12,), name="Finger1")
    x2 = layers.Input(shape=(12,), name="Finger2")
    x3 = layers.Input(shape=(12,), name="Finger3")
    x4 = layers.Input(shape=(12,), name="Finger4")
    x5 = layers.Input(shape=(12,), name="Finger5")

    h1 = layers.Dense(12, activation='relu')(x1)
    h2 = layers.Dense(12, activation='relu')(x2)
    h3 = layers.Dense(12, activation='relu')(x3)
    h4 = layers.Dense(12, activation='relu')(x4)
    h5 = layers.Dense(12, activation='relu')(x5)

    h = layers.Concatenate()([h1, h2, h3, h4, h5])
    h = layers.BatchNormalization()(h)
    h = layers.Dropout(0.2)(h)

    h = layers.Dense(80, activation='relu')(h)
    h = layers.BatchNormalization()(h)
    h = layers.Dropout(0.2)(h)
    output = layers.Dense(len(pose))(h)

    model = tf.keras.Model(inputs=[x1,x2,x3,x4,x5], outputs=output)
    opt_fn = tf.keras.optimizers.Adam(learning_rate=learning_rate)
    loss_fn = tf.keras.losses.CategoricalCrossentropy(from_logits=True)
    model.compile(optimizer=opt_fn, 
                  loss=loss_fn, 
                  metrics=['accuracy'])

    return model

board_cb = tf.keras.callbacks.TensorBoard('./models/hand_pose.tblogs')
model = create_model()
model.fit(x=ds_train, validation_data=ds_test,
        epochs=epochs, verbose=1, 
        callbacks=[board_cb, lr_cb])

model.save('./models/hand_pose.h5')


# %% train hand pose
# ===========================================================================import cv2
import cv2
import tensorflow as tf
import mediapipe as mp
from common import videoCapture
from landmark import draw_landmark, landmark_to_list, vectorize_landmark

model = tf.keras.models.load_model('./models/hand_pose.h5', compile=False)
hands =  mp.solutions.hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5, max_num_hands=1)

def predict(frame, key, videoCap):
    h, w, c = frame.shape
    ratio = h/w

    results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if results.multi_handedness:
        draw_landmark(frame, results)
        landmark = landmark_to_list(results.multi_hand_landmarks[0].landmark, ratio)
        vlandmark = [vectorize_landmark(landmark)]
        inputs = tf.split(vlandmark, num_or_size_splits=5, axis=-1)
        
        index = tf.argmax(model.predict([inputs]), axis=1).numpy()[0]

        pred_pose = pose[index]
        # if pred_pose != 'None':
        cv2.putText(frame, pred_pose, (int(w/4),30), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0), 2)

    fps = str(videoCap.get(cv2.CAP_PROP_FPS))
    cv2.putText(frame, fps+' fps', (0,10), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0,255,0), 1)
    return frame

videoCapture('Gesture Capture', onUpdate=predict)