const SHA256 = require('crypto-js/sha256')

// turn any non-string data into a string
function stringify(data) {
  return typeof data == 'string' ? data : JSON.stringify(data)
}

function hash(input) {
  return SHA256(stringify(input)).toString()
}

module.exports = { stringify, hash }
