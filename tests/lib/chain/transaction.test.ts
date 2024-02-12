import { describe, it, expect } from 'vitest'
import Transaction from '@/lib/chain/transaction'
import { keccak256Regex } from '@/lib/schemas'
import { mock, buildTransaction } from 'tests/test-utils/helpers'

describe('Transaction Class', () => {
  it('creates a valid transaction', () => {
    vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
    const transaction = buildTransaction()
    vi.useRealTimers()

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.from).toBe(mock.TRANSACTION_ARGS_1.from)
    expect(transaction.to).toBe(mock.TRANSACTION_ARGS_1.to)
    expect(transaction.value).toBe(mock.TRANSACTION_ARGS_1.value)
    expect(transaction.message).toBe(mock.TRANSACTION_ARGS_1.message)
    expect(transaction.createdAt).toBe(mock.SYSTEM_TIMESTAMP)
    expect(transaction.hash).toMatch(keccak256Regex)
    expect(transaction.data).toMatchInlineSnapshot(
      `"0x7b22666f6f223a22626172227d"`,
    )
  })

  it('handles optional fields correctly', () => {
    const transaction = buildTransaction({
      ...mock.TRANSACTION_ARGS_1,
      data: undefined,
      message: undefined,
    })
    expect(transaction.data).toBeNull()
    expect(transaction.message).toBeNull()
  })

  it('calculate hash correctly', () => {
    const transaction = buildTransaction()
    expect(transaction.calculateHash()).toBe(transaction.hash)
  })

  it('verify transaction correctly', () => {
    const transaction = buildTransaction()
    expect(transaction.verify()).toBe(true)
  })

  it('verify fails if transaction is currupted', () => {
    const transaction = buildTransaction()
    transaction.value = 52
    expect(transaction.verify()).toBe(false)
  })
})
