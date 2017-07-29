/* global AWS */

import './config'
import promisify from '../utility/promisify'

if (!process.env.REACT_APP_BUCKET_NAME) throw `'REACT_APP_BUCKET_NAME' env variable is required`

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: process.env.REACT_APP_BUCKET_NAME}
})

export const listAll = promisify(s3.listObjects.bind(s3))
export const uploadItem = promisify(s3.upload.bind(s3))
export const deleteItem = promisify(s3.deleteObject.bind(s3))
