import { MessageSchema } from '..'
import { ValueSchema, TransactionSchema } from '../transaction'

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

describe('ValueSchema', () => {
  it('validates nonnegative values', () => {
    expect(ValueSchema.safeParse(100).success).toBeTruthy()
    expect(ValueSchema.safeParse(0).success).toBeTruthy()
  })

  it('rejects negative values', () => {
    expect(ValueSchema.safeParse(-1).success).toBeFalsy()
    expect(ValueSchema.safeParse(1.3).success).toBeFalsy()
    expect(ValueSchema.safeParse(1000001).success).toBeFalsy()
  })
})

describe('TransactionSchema', () => {
  const validTransaction = {
    from: '0x1234567890123456789012345678901234567890',
    to: '0x1234567890123456789012345678901234567890',
    value: 100,
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
