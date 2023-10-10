const generateHash = require('./hashing')
const Block = require('./block')
const { GENESIS_DATA, MINE_RATE } = require('./config')

const BLOCK0 = {
  index: 0,
  data: GENESIS_DATA.data,
  previousHash: GENESIS_DATA.previousHash,
  difficulty: GENESIS_DATA.difficulty,
}

const block = new Block(BLOCK0)

describe('Block', () => {
  it('creates a Block object', () => {
    expect(block).toBeInstanceOf(Block)
  })
  it('creates a block with the correct data', () => {
    expect(block.index).toBe(BLOCK0.index)
    expect(block.data).toBe(BLOCK0.data)
    expect(block.difficulty).toBe(BLOCK0.difficulty)
  })
  it('has the correct hash', () => {
    expect(block.hash).toEqual(
      generateHash(
        // assuming data is a string otherwise need to JSON.stringify
        block.index +
          block.timestamp +
          block.nonce +
          block.difficulty +
          block.data +
          block.previousHash
      )
    )
  })
  it('sets a `hash` based on difficulty', () => {
    console.log(block)
    expect(block.hash.substring(0, block.difficulty)).toEqual(
      '0'.repeat(block.difficulty)
    )
  })
})
