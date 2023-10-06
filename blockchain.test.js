const generateHash = require('./hashing')
const Block = require('./block')
const Blockchain = require('./blockchain')

describe('Blockchain', () => {
  let blockchain

  beforeEach(() => {
    blockchain = new Blockchain()
    blockchain.addBlock({ amount: 50 })
    blockchain.addBlock({ amount: 100 })
  })

  it('starts with a genesis block', () => {
    const block0 = blockchain.getBlock(0)
    expect(block0.getIndex()).toEqual(0)
    expect(block0.getData()).toBe('Genesis Block')
  })

  it('adds a new block', () => {
    const data = { amount: 150 }
    blockchain.addBlock(data)
    expect(blockchain.getBlock(3).getData()).toEqual(data)
  })

  it('can fetch latest block', () => {
    expect(blockchain.getLastBlock().getIndex()).toBe(2)
  })

  it('validates a valid chain', () => {
    expect(blockchain.isValidChain()).toBe(true)
  })

  it('validates a new chain', () => {
    expect(new Blockchain().isValidChain()).toBe(true)
  })
})

// This will need to be tested by tampering with a blockchain file that gets read in
// describe('Invalid Blockchain', () => {
//   it('invalidates a chain with a tampered genesis block', () => {
//     const block0 = blockchain.getBlock(0)
//     block0.data = { amount: 500 }
//     block0.hash = block0.calculateHash()
//     expect(blockchain.isValidChain()).toBe(false)
//   })

//   it('invalidates a chain with a tampered block', () => {
//     const block1 = blockchain.getBlock(1)
//     const block2 = blockchain.getBlock(2)
//     block1.data = { amount: 500 }
//     block1.hash = block1.calculateHash()
//     block2.hash = block1.hash
//     expect(blockchain.isValidChain()).toBe(false)
//   })
// })
