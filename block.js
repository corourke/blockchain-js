const generateHash = require('./hashing')

class Block {
  constructor({ index, data, previousHash, difficulty }) {
    this.index = index
    this.data = data
    this.previousHash = previousHash
    this.difficulty = difficulty

    this.timestamp = Date.now()
    this.nonce = 0
    this.hash = undefined

    this.mineHash()
  }

  calculateHash() {
    return generateHash(
      this.index +
        this.timestamp +
        this.nonce +
        this.difficulty +
        (typeof this.data == 'string' ? this.data : JSON.stringify(this.data)) + // if !type string
        this.previousHash
    )
  }

  // Finds a hash value that satisfies the difficulty level set by the chain
  mineHash() {
    var newHash
    while (this.hash == undefined && this.nonce < Number.MAX_SAFE_INTEGER) {
      newHash = this.calculateHash()
      if (
        newHash.substring(0, this.difficulty) == '0'.repeat(this.difficulty)
      ) {
        this.hash = newHash
      } else {
        this.nonce += 1
      }
    }
  }
}

module.exports = Block
