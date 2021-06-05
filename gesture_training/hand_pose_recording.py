#%% settings
# ============================================================================
db_path = './datasets/hand_pose'
pose_type = ['None', 'pointer1', 'pointer2'] # , 'horz_punch'


# %% record data
# =========================================================================
import json
import cv2
import mediapipe as mp
from common import videoCapture, getLastFileName
from landmark import draw_landmark, landmark_to_list, vectorize_landmark

hands =  mp.solutions.hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5, max_num_hands=1)

def predict(frame, key):
    h, w, c = frame.shape
    ratio = h/w

    results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if results.multi_handedness:
        draw_landmark(frame, results)
        landmark = landmark_to_list(results.multi_hand_landmarks[0].landmark, ratio)
        vlandmark = vectorize_landmark(landmark)
    
        if 0 <= key-48 <= 9:
            label = key-48
            pose = pose_type[label]

            filepath = '{path}/{pose}/'.format(path=db_path, pose=pose)
            filename = str(getLastFileName(filepath) + 1) + '.json'
            content = vlandmark
            
            with open(filepath+filename, 'w') as file:
                json.dump(content, file)
                print(str(label) + " " + pose + " " + filename)

    return frame

videoCapture('Gesture Capture', onUpdate=predict)


# %% save the entire dataset into a single dataset file
# ========================================================================
import json
import numpy as np
import tensorflow as tf
import os

data = []

for index in range(len(pose_type)):
    folder = pose_type[index]
    path = db_path+'/'+folder
    filenames = os.listdir(path)

    for names in filenames:
        with open(path+'/'+names, 'r') as file:
            vlandmark = json.load(file)
            data.append(vlandmark + [index])

tf.io.write_file(db_path + '/hand_pose.ds',  tf.io.serialize_tensor(data))
with open(db_path + '/pose_name.json', 'w') as file:
    json.dump(pose_type, file)
