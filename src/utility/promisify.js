export default function (fn) {
  return function () {
    var args = Array.from(arguments)
    return new Promise(function (res, rej) {
      fn.apply(null, args.concat(function (err, data) {
        if (err) return rej(err)
        res(data)
      }))
    })
  }
}
