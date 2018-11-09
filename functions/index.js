exports.toBigQuery = async (data, context) => {
  console.log(JSON.stringify(data))
  const file = data

  const { BigQuery } = require('@google-cloud/bigquery')
  const { Storage } = require('@google-cloud/storage')

  // specify projectID and bigquery datasetID below
  const projectId = 'ivikramtiwari'
  const datasetId = 'census_consensus'
  const bucketName = file.bucket
  const filename = file.name

  const tableId = `${filename.split('.')[0]}_STAGING`

  console.log(`Load ${filename} into ${tableId}.`)

  // Instantiates clients
  const bigquery = new BigQuery({ projectId })
  const storage = new Storage({ projectId })

  const SCHEMA_OBJECT = {
    fields: [
      { name: 'age', type: 'INTEGER' },
      { name: 'workclass', type: 'STRING' },
      { name: 'fnlwgt', type: 'INTEGER' },
      { name: 'education', type: 'STRING' },
      { name: 'education_num', type: 'INTEGER' },
      { name: 'marital_status', type: 'STRING' },
      { name: 'occupation', type: 'STRING' },
      { name: 'relationship', type: 'STRING' },
      { name: 'race', type: 'STRING' },
      { name: 'gender', type: 'STRING' },
      { name: 'capital_gain', type: 'INTEGER' },
      { name: 'capital_loss', type: 'INTEGER' },
      { name: 'hours_per_week', type: 'INTEGER' },
      { name: 'native_country', type: 'STRING' },
      { name: 'income_bracket', type: 'STRING' }
    ]
  }

  const tableOptions = {
    schema: SCHEMA_OBJECT
  }

  let job

  // OPTIONAL: delete existing sample table
  await bigquery
    .dataset(datasetId)
    .table(tableId)
    .delete()

  // OPTIONAL: create table with schema
  await bigquery.dataset(datasetId).createTable(tableId, tableOptions)

  // Loads data from a Google Cloud Storage file into the table
  await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(storage.bucket(bucketName).file(filename))
    .then(results => {
      job = results[0]
      console.log(`Job ${job.id} started.`)

      // Wait for the job to finish
      return job
    })
    .then(metadata => {
      // Check the job's status for errors
      const errors = metadata.status.errors
      if (errors && errors.length > 0) {
        throw errors
      }
    })
    .then(() => {
      console.log(`Job ${job.id} completed.`)
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
}

//   gcloud functions deploy toBigQuery --runtime nodejs8 --trigger-resource ivikramtiwari-e2e-ml-gcp-census --trigger-event google.storage.object.finalize
