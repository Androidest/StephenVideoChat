import cv2
import os
from pathlib import Path

def videoCapture(winName, onUpdate, onClose=None):
    videoCap = cv2.VideoCapture(0)
    cv2.namedWindow(winName)
    key = -1
    
    while(True):
        ret, frame = videoCap.read()
        if ret==True:
            frame = cv2.flip(frame, 1)
            frame = onUpdate(frame, key)
            cv2.imshow(winName, frame)

        key = cv2.waitKey(1)
        if key in [27, 32, 0]:
            if onClose:
                onClose()
            videoCap.release()
            cv2.destroyAllWindows()
            break

def getLastFileName(path):
    path = Path(path)
    if not path.exists():
        path.mkdir(parents=True)

    fileNames = os.listdir(path)
    if len(fileNames) is not 0:
        fileNames = [int(name.split('.')[0]) for name in fileNames]
        lastFileName = max(fileNames)
        return lastFileName
        
    return 0