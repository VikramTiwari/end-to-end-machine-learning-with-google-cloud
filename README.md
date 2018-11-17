# E2E-ML-GCP

## Raw data

- Get the data using event driven cloud functions
  - functions: https://console.cloud.google.com/functions/details/us-central1/toBigQuery?project=ivikramtiwari&tab=general&duration=PT1H
- Store the data in BigQuery
  - bigquery: https://console.cloud.google.com/bigquery?project=ivikramtiwari&folder&organizationId&p=ivikramtiwari&d=census_consensus&t=adult_STAGING&page=table

## Enriched data

- Cleanup the data using dataprep
  - dataprep: https://clouddataprep.com/flows/106821?recipe=514701&tab=recipe
- Run the cleanup job as a dataflow job at scale
  - dataflow: https://console.cloud.google.com/dataflow/jobsDetail/locations/us-central1/jobs/2018-11-09_09_28_35-15753238828455050695?project=ivikramtiwari

## Experiments

- Launch a deep learning VM and then connect to it using SSH tunnel to access Jupyter lab
  - Deep Learning VMs
    - compute: https://console.cloud.google.com/compute/instancesDetail/zones/us-central1-f/instances/tf?project=ivikramtiwari
    - local: http://localhost:8080/lab?
- Launch your deep learning job on CMLE and on completion, get the model as output
  - cmle
  - job: https://console.cloud.google.com/mlengine/jobs/gde_summit_18_alpha_1?project=ivikramtiwari
  - model: https://console.cloud.google.com/mlengine/models/census?project=ivikramtiwari

## More links

- Kaggle: https://www.kaggle.com/vikramtiwari
- slids: https://docs.google.com/presentation/d/1HpNoH2lmzsKgwmC2xDQrVTRuJS75Dtwvp3fZCb1qo74/present
