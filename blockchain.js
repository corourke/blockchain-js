const Block = require('./block')

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
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
    return this.chain[this.chain.length - 1]
  }

  getBlock(n) {
    if (n < 0 || n >= this.chain.length || Math.trunc(n) != n) return undefined
    return this.chain[n]
  }

  addBlock(data) {
    const prevBlock = this.getLastBlock()
    const newBlock = new Block({
      index: prevBlock.index + 1,
      timestamp: Date.now(),
      data,
      previousHash: prevBlock.hash,
    })
    this.chain.push(newBlock)
  }

  isValidChain() {
    return Blockchain.validateChain(this.chain)
  }

  static validateChain(chain) {
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i]
      const previousBlock = chain[i - 1]

      // The current block
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      // Prior block
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }

    return true
  }

  // Replacement chain must be longer and valid
  replaceChain(newChain) {
    if (Blockchain.validateChain(newChain) == false) {
      console.error('When replacing chain, new chain was not valid.')
    } else if (newChain.length <= this.chain.length) {
      console.error(
        'When replacing chain, new chain was not longer than original chain.'
      )
    } else {
      this.chain = newChain
      console.log('Replacing chain')
    }
  }
}

module.exports = { Blockchain }
