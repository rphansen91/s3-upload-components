/* global AWS */

export default (region, identityPool) => new Promise((res, rej) => {
  if (!region) return rej(new Error(`'region' must be supplied`))
  if (!identityPool) return rej(new Error(`'identityPool' must be supplied`))

  AWS.config.update({
    region: region,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPool
    })
  })

  res(AWS)
})
