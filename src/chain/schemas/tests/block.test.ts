import { BLOCK } from '../../tests/mock'
import { BlockListSchema, BlockSchema } from '../block'

describe('BlockSchema', () => {
  it('validates a correct block', () => {
    expect(BlockSchema.safeParse(BLOCK).success).toBeTruthy()
    expect(
      BlockSchema.safeParse({ ...BLOCK, transactions: [] }).success
    ).toBeTruthy()
  })

  it('rejects blocks with invalid data', () => {
    expect(
      BlockSchema.safeParse({ ...BLOCK, prevHash: 'invalidHash' }).success
    ).toBeFalsy()
    expect(
      BlockSchema.safeParse({ ...BLOCK, hash: 'invalidHash' }).success
    ).toBeFalsy()
    expect(BlockSchema.safeParse({ ...BLOCK, index: -4 }).success).toBeFalsy()
    expect(
      BlockSchema.safeParse({ ...BLOCK, difficulty: 65 }).success
    ).toBeFalsy()
  })
})

describe('BlockListSchema', () => {
  const validBlockList = [BLOCK, { ...BLOCK, index: 2 }]

  it('validates a correct block list', () => {
    expect(BlockListSchema.safeParse(validBlockList).success).toBeTruthy()
  })

  it('rejects block lists with invalid blocks', () => {
    const invalidBlockList = [
      ...validBlockList,
      { ...BLOCK, prevHash: 'invalidHash' },
    ]
    expect(BlockListSchema.safeParse(invalidBlockList).success).toBeFalsy()
  })
})
