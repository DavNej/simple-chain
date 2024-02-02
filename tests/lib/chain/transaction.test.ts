import { describe, it, expect, vi } from 'vitest'
import Transaction from '@/lib/chain/transaction'
import * as mock from 'tests/test-utils'

const validArgs = {
  from: mock.ADDRESS_ALICE,
  to: mock.ADDRESS_BOB,
  value: 100,
  data: mock.DATA_JSON,
  message: mock.MESSAGE,
}

vi.useFakeTimers().setSystemTime(new Date('2024-01-01'))

describe('Transaction Class', () => {
  it('creates a valid transaction', () => {
    const transaction = new Transaction(validArgs)

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.from).toBe(validArgs.from)
    expect(transaction.to).toBe(validArgs.to)
    expect(transaction.value).toBe(validArgs.value)
    expect(transaction.data).toBe(validArgs.data)
    expect(transaction.message).toBe(validArgs.message)
    expect(transaction.createdAt).toBe(1704067200000)
  })

  it('handles optional fields correctly', () => {
    const transaction = new Transaction({
      ...validArgs,
      data: undefined,
      message: undefined,
    })
    expect(transaction.data).toBeNull()
    expect(transaction.message).toBeNull()
  })
})
