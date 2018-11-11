# Docker based serving

## setup

```sh
# pull docker image
docker pull tensorflow/serving

# serve your model

docker run -p 8501:8501 \
  --mount type=bind,source=/Users/vikram/Documents/code/vikram/e2e-ml-gcp/serving/census/,target=/models/census -e MODEL_NAME=census -t tensorflow/serving --name=tfserving
```

## usage

```sh
# make predictions
curl -d '{"instances": [[-0.39725269, 1.41205707, -1.12664623, -0.25683275, -1.027385, 0.72635358, -1.00016413, 0.02383449, -0.51114231, -0.04753316, -1.49067405, 0.41584124, -0.83648691]]}' -X POST http://localhost:8501/v1/models/census:predict
```
