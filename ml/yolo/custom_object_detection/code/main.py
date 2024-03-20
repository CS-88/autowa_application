from ultralytics import YOLO

#load model
model = YOLO("yolov8n.yaml")

#train model
results = model.train(data="coco128.yaml", epochs=3)