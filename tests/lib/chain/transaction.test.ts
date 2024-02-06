import { describe, it, expect } from 'vitest'
import Transaction from '@/lib/chain/transaction'
import { mock, buildTransaction } from 'tests/test-utils/helpers'

describe('Transaction Class', () => {
  it('creates a valid transaction', () => {
    const transaction = buildTransaction()

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.from).toBe(mock.TRANSACTION_ARGS_1.from)
    expect(transaction.to).toBe(mock.TRANSACTION_ARGS_1.to)
    expect(transaction.value).toBe(mock.TRANSACTION_ARGS_1.value)
    expect(transaction.data).toBe(mock.TRANSACTION_ARGS_1.data)
    expect(transaction.message).toBe(mock.TRANSACTION_ARGS_1.message)
    expect(transaction.createdAt).toBe(1704067200000)
  })

  it('handles optional fields correctly', () => {
    const transaction = new Transaction({
      ...mock.TRANSACTION_ARGS_1,
      data: undefined,
      message: undefined,
    })
    expect(transaction.data).toBeNull()
    expect(transaction.message).toBeNull()
  })
})
