#%% load dataset
# ========================================================================
from numpy.core.fromnumeric import squeeze
import tensorflow as tf
import tensorflow.keras.layers as layers
from tensorflow.keras.regularizers import l2
import json
import shutil
from tensorflow.python.keras.layers.core import Dropout

from tensorflow.python.keras.layers.normalization_v2 import BatchNormalization

batch_size = 64

def getLabelName(path):
    gesture = []
    with open(path) as file:
        gesture = json.load(file)
    return gesture

def load_data(split=0.9):
    gesture = getLabelName('./datasets/hand_gesture/gesture_name.json')

    data = tf.io.read_file('./datasets/hand_gesture/hand_gesture.ds')
    data = tf.io.parse_tensor(data, tf.float32).numpy()
    label = tf.io.read_file('./datasets/hand_gesture/hand_gesture_label.ds')
    label = tf.io.parse_tensor(label, tf.int32).numpy()
    label = tf.one_hot(label, len(gesture))
    ds = tf.data.Dataset.from_tensor_slices((data, label))

    ds = ds.shuffle(buffer_size=len(ds))
    splitIndex = int(len(ds) * split)
    ds_train = ds.take(splitIndex).batch(batch_size)
    ds_test = ds.skip(splitIndex).batch(batch_size)

    return ds_train, ds_test, gesture

ds_train, ds_test, gesture = load_data(split=0.8)


# %% train hand gesture
# ===========================================================================
epochs = 60
learning_rate = 0.01
input_shape = (None, ds_train.element_spec[0].shape[2])

def lr_decay(epoch):
    return learning_rate * 0.97 ** epoch
lr_cb = tf.keras.callbacks.LearningRateScheduler(lr_decay)

def create_model(input_shape):
    model = tf.keras.Sequential([
        layers.Input(shape=input_shape),
        layers.LSTM(128, return_sequences=True),
        layers.LSTM(100),
        layers.Dense(len(gesture))
    ])

    opt_fn = tf.keras.optimizers.Adam(learning_rate=learning_rate)
    loss_fn = tf.keras.losses.CategoricalCrossentropy(from_logits=True)
    model.compile(optimizer=opt_fn, 
                  loss=loss_fn, 
                  metrics=['accuracy'])

    return model

tensorboard_path = './models/hand_gesture.tblogs'
shutil.rmtree(tensorboard_path, ignore_errors=True)
board_cb = tf.keras.callbacks.TensorBoard(tensorboard_path)
model = create_model(input_shape)
model.fit(x=ds_train, validation_data=ds_test,
        epochs=epochs, verbose=1, 
        callbacks=[board_cb, lr_cb])

model.save('./models/hand_gesture.h5')


# %% train hand gesture
# ===========================================================================import cv2
import cv2
import tensorflow as tf
import mediapipe as mp
import json
import time
from common import videoCapture
from landmark import draw_landmark, landmark_to_list, vectorize_landmark, landmark_to_list_norm


def getLabelName(path):
    gesture = []
    with open(path) as file:
        gesture = json.load(file)
    return gesture

sequence = []
lastFrameTime = time.time()
gesture = getLabelName('./datasets/hand_gesture/gesture_name.json')
pose = getLabelName('./datasets/hand_pose/pose_name.json')
gmodel = tf.keras.models.load_model('./models/hand_gesture.h5', compile=False)
pmodel = tf.keras.models.load_model('./models/hand_pose.h5', compile=False)
hands =  mp.solutions.hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5, max_num_hands=1)

def predict(frame, key, videoCap):
    global lastFrameTime, sequence
    h, w, c = frame.shape
    ratio = h/w

    dt = time.time() - lastFrameTime
    lastFrameTime = time.time()

    results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if results.multi_handedness:
        draw_landmark(frame, results)
        landmark = landmark_to_list(results.multi_hand_landmarks[0].landmark, ratio)
        vlandmark = [vectorize_landmark(landmark)]

        pinputs = tf.split(vlandmark, num_or_size_splits=5, axis=-1)
        index = tf.argmax(pmodel([pinputs]), axis=1).numpy()[0]
        pred_pose = pose[index]

        if pred_pose == 'pointer1':
            f1_landmark = landmark_to_list_norm(results.multi_hand_landmarks[0].landmark, ratio)
            f1_landmark += [dt]
            sequence.append(f1_landmark)
            if len(sequence) > 25:
                sequence = sequence[1:]

            input = tf.constant([sequence])
            index = tf.argmax(gmodel(input), axis=1).numpy()[0]
            pred_gesture = gesture[index]
            cv2.putText(frame, pred_gesture, (int(w/4),60), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0), 2)

        # if pred_pose != 'None':
        cv2.putText(frame, pred_pose, (int(w/4),30), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0), 2)

    fps = str(videoCap.get(cv2.CAP_PROP_FPS))
    cv2.putText(frame, str(dt), (0,10), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0,255,0), 1)
    return frame

videoCapture('Gesture Capture', onUpdate=predict)
