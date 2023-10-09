const generateHash = require('./hashing')
const Block = require('./block')

const BLOCK0 = {
  index: 0,
  timestamp: Date.now(),
  data: 'Genesis',
  previousHash: '',
}

const block = new Block(BLOCK0)

describe('Block', () => {
  it('creates a Block object', () => {
    expect(block).toBeInstanceOf(Block)
  })
  it('creates a block with the correct data', () => {
    expect(block.timestamp).toBe(BLOCK0.timestamp)
    expect(block.data).toBe(BLOCK0.data)
  })
  it('has the correct hash', () => {
    expect(block.hash).toEqual(
      generateHash(
        // assuming data is a string otherwise JSON.stringify
        BLOCK0.index + BLOCK0.timestamp + BLOCK0.data + BLOCK0.previousHash
      )
    )
  })
})
