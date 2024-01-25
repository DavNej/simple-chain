import { TRANSACTION } from '../../tests/mock'
import {
  ValueSchema,
  TransactionSchema,
  TransactionListSchema,
} from '../transaction'

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
  it('validates correct transactions', () => {
    expect(TransactionSchema.safeParse(TRANSACTION).success).toBeTruthy()
  })

  it('rejects transactions with invalid data', () => {
    const invalidTransaction = { ...TRANSACTION, from: 'invalidAddress' }
    expect(TransactionSchema.safeParse(invalidTransaction).success).toBeFalsy()
  })
})

describe('TransactionListSchema', () => {
  const validTransactionList = [TRANSACTION, { ...TRANSACTION, value: 500 }]

  it('validates a correct transaction list', () => {
    expect(
      TransactionListSchema.safeParse(validTransactionList).success
    ).toBeTruthy()
  })

  it('rejects transaction lists with invalid transactions', () => {
    const invalidTransactionList = [
      ...validTransactionList,
      { ...TRANSACTION, from: 'invalidAddress' },
    ]
    expect(
      TransactionListSchema.safeParse(invalidTransactionList).success
    ).toBeFalsy()
  })
})
