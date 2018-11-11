# Functions

## Deploy the function

```sh
gcloud functions deploy toBigQuery --runtime nodejs8 --trigger-resource ivikramtiwari-e2e-ml-gcp-census --trigger-event google.storage.object.finalize
```
