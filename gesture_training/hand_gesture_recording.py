#%% settings
# ============================================================================
db_path = './datasets/hand_gesture'
gesture_type = ['None', 'single_click'] 


# %% record data
# =========================================================================
import json
import numpy as np
import cv2
import mediapipe as mp
import time
import tensorflow as tf
from common import videoCapture, getLastFileName
from landmark import draw_landmark, landmark_to_list_norm, vectorize_landmark, landmark_to_list

frame_rate = 30
recordFrames = 20
frameCount = -1
sequence = []
gesture = None
log = ''
log2 = ''
lastFrameTime = time.time()
frame_rate = 1
time_elapsed = 1

pose = []
with open('./datasets/hand_pose/pose_name.json') as file:
    pose = json.load(file)
model = tf.keras.models.load_model('./models/hand_pose.h5', compile=False)
hands =  mp.solutions.hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5, max_num_hands=1)

def predict(frame, key, videoCap):
    global frameCount, sequence, gesture, log, log2, lastFrameTime, frame_rate, time_elapsed

    if 0 <= key-48 <= 9:
        label = key-48
        gesture = gesture_type[label]
        frameCount = 0
        sequence.clear()
        print('### Start recoding gesture: {gesture} ###'.format(gesture=gesture))

    dt = time.time() - lastFrameTime
    lastFrameTime = time.time()
    time_elapsed += dt
    if time_elapsed < 1./frame_rate:
        return []

    time_elapsed = 0
    frame_rate = np.random.normal(loc=25, scale=5) # fps 21 ~ 39 

    h, w, c = frame.shape
    ratio = h/w
    results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

    if results.multi_handedness:
        draw_landmark(frame, results)

        f1_landmark = landmark_to_list_norm(results.multi_hand_landmarks[0].landmark, ratio)
        landmark = landmark_to_list(results.multi_hand_landmarks[0].landmark, ratio)
        vlandmark = [vectorize_landmark(landmark)]
        inputs = tf.split(vlandmark, num_or_size_splits=5, axis=-1)
        index = tf.argmax(model([inputs]), axis=1).numpy()[0]
        log2 = pose[index]
            
        if frameCount != -1 and frameCount < recordFrames:
            frameCount += 1
            sequence.append(f1_landmark + [dt])
            log = "Recording {gesture}: {percent}%".format(gesture=gesture, percent=int(frameCount/recordFrames*100))

        elif frameCount == recordFrames:
            content = sequence
            filepath = '{path}/{gesture}/'.format(path=db_path, gesture=gesture)
            filename = str(getLastFileName(filepath) + 1) + '.json'
            with open(filepath+filename, 'w') as file:
                json.dump(content, file)
                print(gesture + "-> " + filename)
                log = "{gesture} Saved".format(gesture=gesture)

            frameCount = -1

    cv2.putText(frame, log, (int(w/5),30), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0), 2)       
    cv2.putText(frame, log2, (int(w/4),60), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0), 2)       
    return frame

videoCapture('Gesture Capture', onUpdate=predict)


# %% save the entire dataset into a single dataset file
# ========================================================================
import json
import numpy as np
import tensorflow as tf
import os

data = []
label = []

for index in range(len(gesture_type)):
    folder = gesture_type[index]
    path = db_path+'/'+folder
    filenames = os.listdir(path)

    for names in filenames:
        with open(path+'/'+names, 'r') as file:
            sequence = json.load(file)
            data.append(sequence)
            label.append(index)

tf.io.write_file(db_path + '/hand_gesture.ds',  tf.io.serialize_tensor(data))
tf.io.write_file(db_path + '/hand_gesture_label.ds',  tf.io.serialize_tensor(label))
with open(db_path + '/gesture_name.json', 'w') as file:
    json.dump(gesture_type, file)

