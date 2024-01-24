import { MessageSchema, AmountSchema, TransactionSchema } from '../transaction'

describe('MessageSchema', () => {
  it('validates correct messages', () => {
    expect(MessageSchema.safeParse('Hello World').success).toBeTruthy()
    expect(MessageSchema.safeParse('').success).toBeTruthy()
    expect(MessageSchema.safeParse(undefined).success).toBeTruthy()
    expect(MessageSchema.safeParse(null).success).toBeTruthy()
    expect(MessageSchema.safeParse(123).success).toBeTruthy()
  })

  it('rejects incorrect messages', () => {
    expect(MessageSchema.safeParse('a'.repeat(261)).success).toBeFalsy()
  })
})

describe('AmountSchema', () => {
  it('validates nonnegative amounts', () => {
    expect(AmountSchema.safeParse(100).success).toBeTruthy()
    expect(AmountSchema.safeParse(0).success).toBeTruthy()
  })

  it('rejects negative amounts', () => {
    expect(AmountSchema.safeParse(-1).success).toBeFalsy()
    expect(AmountSchema.safeParse(1.3).success).toBeFalsy()
    expect(AmountSchema.safeParse(1000001).success).toBeFalsy()
  })
})

describe('TransactionSchema', () => {
  const validTransaction = {
    from: '0x1234567890123456789012345678901234567890',
    to: '0x1234567890123456789012345678901234567890',
    amount: 100,
    data: {},
    message: 'Valid message',
  }

  it('validates correct transactions', () => {
    expect(TransactionSchema.safeParse(validTransaction).success).toBeTruthy()
  })

  it('rejects transactions with invalid data', () => {
    const invalidTransaction = { ...validTransaction, from: 'invalidAddress' }
    expect(TransactionSchema.safeParse(invalidTransaction).success).toBeFalsy()
  })
})
