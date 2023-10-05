const SHA256 = require('crypto-js/sha256')

function generateHash(input) {
  const data = typeof input == 'string' ? input : JSON.stringify(input)
  return SHA256(data).toString()
}

module.exports = generateHash
