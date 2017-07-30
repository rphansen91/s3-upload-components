import configAWS from './config'
import promisify from '../utility/promisify'

export default ({ name, region, identityPool }) => {
  if (!name) return Promise.reject(new Error(`bucket 'name' must be supplied`))

  return configAWS(region, identityPool)
  .then(AWS => {
    return new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: name}
    })
  })
  .then(s3 => ({
    listAll: promisify(s3.listObjects.bind(s3)),
    uploadItem: promisify(s3.upload.bind(s3)),
    deleteItem: promisify(s3.deleteObject.bind(s3))
  }))
}
