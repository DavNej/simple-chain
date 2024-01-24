import { BlockSchema } from '../block'

describe('BlockSchema', () => {
  const validBlock = {
    index: 1,
    timeStamp: new Date(),
    data: null,
    prevHash:
      '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    nonce: 2,
    hash: 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    difficulty: 3,
  }

  it('validates a correct block', () => {
    expect(BlockSchema.safeParse(validBlock).success).toBeTruthy()
  })

  it('rejects blocks with invalid data', () => {
    const invalidBlock = { ...validBlock, prevHash: 'invalidHash' }
    expect(BlockSchema.safeParse(invalidBlock).success).toBeFalsy()
  })
})
