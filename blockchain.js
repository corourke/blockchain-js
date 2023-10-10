const Block = require('./block')
const { GENESIS_DATA } = require('./config')
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block({
      index: 0,
      data: GENESIS_DATA.data,
      previousHash: GENESIS_DATA.previousHash,
      difficulty: GENESIS_DATA.difficulty,
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
      data,
      previousHash: prevBlock.hash,
      difficulty: prevBlock.difficulty,
    })
    this.chain.push(newBlock)
  }

  isValidChain() {
    return Blockchain.validateChain(this.chain)
  }

  static validateChain(chain) {
    let lastDifficulty
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i]
      const previousBlock = chain[i - 1]

      // The current block hash is incorrect
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      // Prior block hash doesn't match
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }

      // Difficulty can not change by > 1 from block to block
      if (Math.abs(currentBlock.difficulty - previousBlock.difficulty) > 1) {
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
