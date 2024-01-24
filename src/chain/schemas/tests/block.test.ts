import { TRANSACTION, VALID_SHA256, VALID_SHA256_2 } from '../../tests/mock'
import { BlockSchema } from '../block'

describe('BlockSchema', () => {
  const validBlock = {
    index: 1,
    timeStamp: new Date(),
    difficulty: 1,
    prevHash: VALID_SHA256,
    hash: VALID_SHA256_2,
    nonce: 2,
    message: null,
    transactions: [TRANSACTION],
  }

  it('validates a correct block', () => {
    expect(BlockSchema.safeParse(validBlock).success).toBeTruthy()
  })

  it('rejects blocks with invalid data', () => {
    expect(
      BlockSchema.safeParse({ ...validBlock, prevHash: 'invalidHash' }).success
    ).toBeFalsy()
    expect(
      BlockSchema.safeParse({ ...validBlock, hash: 'invalidHash' }).success
    ).toBeFalsy()
    expect(
      BlockSchema.safeParse({ ...validBlock, index: -4 }).success
    ).toBeFalsy()
    expect(
      BlockSchema.safeParse({ ...validBlock, difficulty: 65 }).success
    ).toBeFalsy()
    expect(
      BlockSchema.safeParse({ ...validBlock, transactions: [] }).success
    ).toBeFalsy()
  })
})
