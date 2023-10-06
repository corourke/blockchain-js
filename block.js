const generateHash = require('./hashing')

class Block {
  #index
  #timestamp
  #data
  #previousHash
  #hash
  constructor({ index, timestamp, data, previousHash }) {
    ;(this.#index = index),
      (this.#timestamp = timestamp),
      (this.#data = data),
      (this.#previousHash = previousHash),
      (this.#hash = this.calculateHash())
  }

  calculateHash() {
    return generateHash(
      this.#index +
        this.#timestamp +
        (typeof this.#data == 'string'
          ? this.#data
          : JSON.stringify(this.#data)) + // if !type string
        this.#previousHash
    )
  }

  getIndex() {
    return this.#index
  }

  getTimestamp() {
    return this.#timestamp
  }

  getData() {
    return this.#data
  }

  getPreviousHash() {
    return this.#previousHash
  }

  getHash() {
    return this.#hash
  }
}

module.exports = Block
