const INITIAL_DIFFICULTY = 2
const MINE_RATE = 1000

const GENESIS_DATA = {
  previousHash: '',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 1,
  data: 'Genesis',
}

module.exports = { GENESIS_DATA, MINE_RATE }
