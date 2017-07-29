/* global AWS */

if (!process.env.REACT_APP_BUCKET_REGION) throw `'REACT_APP_BUCKET_REGION' env variable is required`
if (!process.env.REACT_APP_IDENTITY_POOL_ID) throw `'REACT_APP_IDENTITY_POOL_ID' env variable is required`

AWS.config.update({
  region: process.env.REACT_APP_BUCKET_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
  })
})
