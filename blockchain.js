const Block = require('./block')

class Blockchain {
  #chain
  constructor() {
    this.#chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block({
      index: 0,
      timestamp: Date.now(),
      data: 'Genesis Block',
      previousHash: 'This is awesome',
    })
  }

  getLastBlock() {
    return this.#chain[this.#chain.length - 1]
  }

  getBlock(n) {
    if (n < 0 || n >= this.#chain.length || Math.trunc(n) != n) return undefined
    return this.#chain[n]
  }

  addBlock(data) {
    const prevBlock = this.getLastBlock()
    const newBlock = new Block({
      index: prevBlock.getIndex() + 1,
      timestamp: Date.now(),
      data,
      previousHash: prevBlock.getHash(),
    })
    this.#chain.push(newBlock)
  }

  isValidChain() {
    for (let i = 1; i < this.#chain.length; i++) {
      const currentBlock = this.#chain[i]
      const previousBlock = this.#chain[i - 1]

      // The current block
      if (currentBlock.getHash() !== currentBlock.calculateHash()) {
        return false
      }

      // Prior block
      if (currentBlock.getPreviousHash() !== previousBlock.getHash()) {
        return false
      }
    }

    return true
  }
}

module.exports = Blockchain
