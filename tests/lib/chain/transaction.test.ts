import { describe, expect, it } from 'vitest'
import Transaction from '@/lib/chain/transaction'
import { keccak256Regex } from '@/lib/schemas'
import { buildTransaction, mock } from '@/tests/test-utils/helpers'

const blockNumber = 3

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
    expect(transaction.status).toBe('pending')
    expect(transaction.hash).toBeNull()
    expect(transaction.block).toBeNull()
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

    const hash = transaction.calculateHash()
    expect(hash).toMatch(keccak256Regex)
  })

  it('adds to block correctly', () => {
    const transaction = buildTransaction()

    const hash = transaction.addToBlock(blockNumber)
    expect(hash).toMatch(keccak256Regex)
    expect(hash).toBe(transaction.hash)
  })

  it('sets status correctly', () => {
    const transaction = buildTransaction()
    const newStatus = 'success'
    transaction.setStatus(newStatus)
    expect(transaction.status).toBe(newStatus)
  })

  it('sets status without influencing has value', () => {
    const transaction = buildTransaction()

    const hash = transaction.addToBlock(blockNumber)
    transaction.setStatus('success')
    expect(transaction.calculateHash()).toBe(hash)
  })

  it('throws an error when block number is not set', () => {
    const transaction = buildTransaction()
    expect(() => transaction.verify()).toThrow('Block number is not set')
  })

  it('verify transaction correctly', () => {
    const transaction = buildTransaction()

    transaction.addToBlock(blockNumber)
    expect(transaction.verify()).toBe(true)
  })

  it('verify fails if transaction is currupted', () => {
    const transaction = buildTransaction()
    transaction.addToBlock(blockNumber)
    transaction.value = 52
    expect(transaction.verify()).toBe(false)
  })
})
