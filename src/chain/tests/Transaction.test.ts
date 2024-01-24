import { Transaction } from '../Transaction'
import { VALID_TRANSACTION_ARGS } from './mock'

describe('Transaction Class', () => {
  it('creates a valid transaction', () => {
    const transaction = new Transaction(VALID_TRANSACTION_ARGS)

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.from).toBe(VALID_TRANSACTION_ARGS.from)
    expect(transaction.to).toBe(VALID_TRANSACTION_ARGS.to)
    expect(transaction.value).toBe(VALID_TRANSACTION_ARGS.value)
    expect(transaction.message).toBe(VALID_TRANSACTION_ARGS.message)
  })

  it('throws error with invalid transaction data', () => {
    const invalidData = { ...VALID_TRANSACTION_ARGS, from: 'invalidAddress' }
    expect(() => new Transaction(invalidData)).toThrow()
  })
})
