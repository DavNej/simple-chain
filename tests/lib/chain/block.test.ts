import { waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Block from '@/lib/chain/block'
import Transaction from '@/lib/chain/transaction'
import { keccak256Regex } from '@/lib/schemas'
import { mock } from '@/tests/test-utils/helpers'

beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
})

afterAll(() => {
  vi.useRealTimers()
})

describe('Block Class', () => {
  it('creates a valid block', () => {
    const block = new Block(mock.BLOCK_ARGS)

    expect(block).toBeInstanceOf(Block)
    expect(block.index).toBe(mock.BLOCK_ARGS.index)
    expect(block.difficulty).toBe(mock.BLOCK_ARGS.difficulty)
    expect(block.prevHash).toBe(mock.BLOCK_ARGS.prevHash)
    expect(block.message).toBe(mock.BLOCK_ARGS.message)
    expect(block.createdAt).toBe(mock.SYSTEM_TIMESTAMP)
    expect(block.hash).toBeNull()
    expect(block.nonce).toBeNull()
    expect(block.merkelRoot).toBeNull()
    expect(block.transactions.size).toBe(2)

    block.transactions.forEach(tx => {
      expect(tx).toBeInstanceOf(Transaction)
      expect(tx.block).toBeNull()
      expect(tx.hash).toBeNull()
      expect(tx.status).toBe('pending')
    })
  })

  it('mines a block', () => {
    const block = new Block(mock.BLOCK_ARGS)

    waitFor(async () => {
      const hash = await block.mine()
      expect(block.hash).toMatch(keccak256Regex)
      expect(block.hash).toBe(hash)
      expect(block.hash!.startsWith('0'.repeat(block.difficulty))).toBe(true)
      expect(block.nonce).toBeInstanceOf(Number)

      block.transactions.forEach(tx => {
        expect(tx.block).toBe(block.index)
        expect(tx.hash).toMatch(keccak256Regex)
        expect(tx.status).toBe('success')
      })
    })
  })

  it('should verify itself', async () => {
    const block = new Block(mock.BLOCK_ARGS)
    await block.mine()
    expect(block.verify()).toBe(true)
  })

  it('should fail to mine a mined block', async () => {
    const block = new Block(mock.BLOCK_ARGS)
    await block.mine()
    await expect(block.mine()).rejects.toMatchInlineSnapshot(
      `"Block has already been mined"`,
    )
  })

  it('should fail to validate a corrupted block', async () => {
    const block = new Block(mock.BLOCK_ARGS)
    await block.mine()
    block.transactions.values().next().value.value += 52 // corrupts the transaction
    expect(block.verify()).toBe(false)
  })
})
