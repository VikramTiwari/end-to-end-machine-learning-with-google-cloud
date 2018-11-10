# Cloud Machine Learning Engine

## Get files

```sh
TRAIN_FILE=adult.data.csv
EVAL_FILE=adult.test.csv

GCS_TRAIN_FILE=gs://cloud-samples-data/ml-engine/census/data/adult.data.csv
GCS_EVAL_FILE=gs://cloud-samples-data/ml-engine/census/data/adult.test.csv

gsutil cp $GCS_TRAIN_FILE $TRAIN_FILE
gsutil cp $GCS_EVAL_FILE $EVAL_FILE
```

## Launch Deep Learning VM
```sh
INSTANCE_NAME=tf
gcloud compute ssh $INSTANCE_NAME -- -L 8080:localhost:8080
```

## Launch job on Cloud ML Engine

```sh
JOB_NAME=gde_summit_18_alpha_1
JOB_DIR=gs://ivikramtiwari-cmle-logs
GCS_TRAIN_FILE=gs://cloud-samples-data/ml-engine/census/data/adult.data.csv
GCS_EVAL_FILE=gs://cloud-samples-data/ml-engine/census/data/adult.test.csv
TRAIN_STEPS=200


gcloud ml-engine jobs submit training $JOB_NAME \
                                    --stream-logs \
                                    --runtime-version 1.4 \
                                    --job-dir $JOB_DIR \
                                    --package-path trainer \
                                    --module-name trainer.task \
                                    --region us-central1 \
                                    -- \
                                    --train-files $GCS_TRAIN_FILE \
                                    --eval-files $GCS_EVAL_FILE \
                                    --train-steps $TRAIN_STEPS

```

## Create model on Cloud ML Engine

```sh
# Create a model on Cloud ML Engine
gcloud ml-engine models create census --regions us-central1

# Export the model binaries
MODEL_BINARIES=gs://ivikramtiwari-cmle-logs/export
STAGING_BUCKET=gs://ivikramtiwari-cmle-logs

# Deploy the model to the prediction service
gcloud ml-engine versions create v1 --model census --origin $MODEL_BINARIES --staging-bucket $STAGING_BUCKET --runtime-version 1.2

# Create a processed sample from the data
python preprocess.py sample.json

# Run the online prediction
gcloud ml-engine predict --model census --version v1 --json-instances sample.json
```
