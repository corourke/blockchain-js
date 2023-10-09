const generateHash = require('./hashing')

class Block {
  constructor({ index, timestamp, data, previousHash }) {
    ;(this.index = index),
      (this.timestamp = timestamp),
      (this.data = data),
      (this.previousHash = previousHash),
      (this.hash = this.calculateHash())
  }

  calculateHash() {
    return generateHash(
      this.index +
        this.timestamp +
        (typeof this.data == 'string' ? this.data : JSON.stringify(this.data)) + // if !type string
        this.previousHash
    )
  }
}

module.exports = Block
