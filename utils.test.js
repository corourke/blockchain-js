const { hash, stringify } = require('./utils')

describe('Hashing Function', () => {
  it('generates a consistent hash from the same string', () => {
    const hash1 = hash('Hello World')
    const hash2 = hash('Hello World')
    expect(hash1).toEqual(hash2)
  })

  it('generates a unique hash for different strings', () => {
    const hash1 = hash('Hello World')
    const hash2 = hash('Hello World!')
    expect(hash1).not.toEqual(hash2)
  })

  it('should stringfy non-strings', () => {
    const hash1 = hash('123')
    const hash2 = hash(123)
    expect(hash1).toEqual(hash2)
  })

  it('generates a consistent hash for javascript object vs. stringified object', () => {
    const obj1 = [
      { id: 0, type: 'send', addr: 'e322' },
      { id: 1, type: 'recv', addr: '88f2' },
    ]
    const hash1 = hash(obj1)
    const hash2 = hash(stringify(obj1))
    expect(hash1).toEqual(hash2)
  })
})
