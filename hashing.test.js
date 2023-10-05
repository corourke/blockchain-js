const generateHash = require('./hashing')

describe('Hashing Function', () => {
  it('generates a consistent hash from the same string', () => {
    const hash1 = generateHash('Hello World')
    const hash2 = generateHash('Hello World')
    expect(hash1).toEqual(hash2)
  })

  it('generates a unique hash for different strings', () => {
    const hash1 = generateHash('Hello World')
    const hash2 = generateHash('Hello World!')
    expect(hash1).not.toEqual(hash2)
  })

  it('should stringfy non-strings', () => {
    const hash1 = generateHash('123')
    const hash2 = generateHash(123)
    expect(hash1).toEqual(hash2)
  })

  it('generates a consistent hash for javascript object vs. stringified object', () => {
    const obj1 = [
      { id: 0, type: 'send', addr: 'e322' },
      { id: 1, type: 'recv', addr: '88f2' },
    ]
    const hash1 = generateHash(obj1)
    const hash2 = generateHash(JSON.stringify(obj1))
    expect(hash1).toEqual(hash2)
  })
})
