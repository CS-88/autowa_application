#pip install ultralytics

from ultralytics import YOLO

#load model
model = YOLO("yolov8n.yaml")

#train model
results = model.train(data="config.yaml", epochs=1)