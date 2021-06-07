import numpy as np
import mediapipe as mp
mp_drawing = mp.solutions.drawing_utils

finger_indexes = [
    [0,1,2,3,4],
    [0,5,6,7,8],
    [0,9,10,11,12],
    [0,13,14,15,16],
    [0,17,18,19,20]
]

def landmark_to_list(landmark, ratio):
    lm = []
    for pos in landmark:
        lm.append(np.array([pos.x, pos.y*ratio, pos.z]))
    return lm

def vectorize_landmark(landmark):
    vlm = []
    for indexes in finger_indexes:
        # vectorize fingers
        for i in range(len(indexes)-1):
            v = landmark[indexes[i+1]] - landmark[indexes[i]]
            vlm += list(v/np.linalg.norm(v))
    return vlm

def draw_landmark(frame, results):
    frame.flags.writeable = True
    for hand_landmarks in results.multi_hand_landmarks:
        mp_drawing.draw_landmarks(frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)


def landmark_to_list_norm(landmark, ratio):
    # filter the elements, keep one finger
    landmark = [landmark[i] for i in [0,5,6,7,8]]
    landmark = landmark_to_list(landmark, ratio)

    lm_norm = []
    origin = np.copy(landmark[0])
    origin[2] = 0
    for pos in landmark:
        lm_norm += list(pos - origin)  

    return lm_norm
    