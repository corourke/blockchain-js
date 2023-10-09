const generateHash = require('./hashing')
const Block = require('./block')
const { Blockchain } = require('./blockchain')

let blockchain

describe('Blockchain', () => {
  beforeEach(() => {
    blockchain = new Blockchain()
    blockchain.addBlock({ amount: 50 })
    blockchain.addBlock({ amount: 100 })
  })

  it('starts with a genesis block', () => {
    const block0 = blockchain.getBlock(0)
    expect(block0.index).toEqual(0)
    expect(block0.data).toBe('Genesis Block')
  })

  it('adds a new block', () => {
    const data = { amount: 150 }
    blockchain.addBlock(data)
    expect(blockchain.getBlock(3).data).toEqual(data)
  })

  it('can fetch latest block', () => {
    expect(blockchain.getLastBlock().index).toBe(2)
  })

  it('validates a valid chain', () => {
    expect(blockchain.isValidChain()).toBe(true)
  })

  it('validates a new chain', () => {
    const newBlockchain = new Blockchain()
    expect(newBlockchain.isValidChain()).toBe(true)
  })

  describe('Invalid Blockchain', () => {
    it('invalidates a chain with a tampered genesis block', () => {
      const block0 = blockchain.getBlock(0)
      block0.data = { amount: 500 }
      block0.hash = block0.calculateHash()
      expect(blockchain.isValidChain()).toBe(false)
    })

    it('invalidates a chain with a tampered block', () => {
      const block1 = blockchain.getBlock(1)
      const block2 = blockchain.getBlock(2)
      block1.data = { amount: 500 }
      block1.hash = block1.calculateHash()
      block2.hash = block1.hash
      expect(blockchain.isValidChain()).toBe(false)
    })
  })
})

let newChain, originalChain

describe('when replacing the chain', () => {
  beforeEach(() => {
    blockchain = new Blockchain()
    blockchain.addBlock({ amount: 50 })
    blockchain.addBlock({ amount: 100 })
    originalChain = blockchain // remember: original is not a copy!

    newChain = new Blockchain()
    newChain.addBlock({ amount: 550 })
    newChain.addBlock({ amount: 600 })

    global.console.error = jest.fn()
    global.console.log = jest.fn()
  })

  describe('and the new chain is not longer', () => {
    it('does not replace the chain', () => {
      blockchain.replaceChain(newChain.chain)
      expect(blockchain.chain).toEqual(originalChain.chain)
    })
  })

  describe('and the new chain is longer', () => {
    beforeEach(() => {
      newChain.addBlock({ amount: 650 })
      newChain.addBlock({ amount: 700 })
    })

    describe('and the chain is invalid', () => {
      it('does not replace the chain', () => {
        newChain.chain[1].hash = 'badHash'
        blockchain.replaceChain(newChain.chain)
        expect(blockchain.chain).toEqual(originalChain.chain)
      })
    })

    describe('and the chain is valid', () => {
      it('replaces the chain', () => {
        expect(newChain.isValidChain()).toBe(true)

        blockchain.replaceChain(newChain.chain)
        expect(blockchain.chain).toEqual(newChain.chain)
      })
    })
  })
})
