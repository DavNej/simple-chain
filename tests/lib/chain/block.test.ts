import { waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Block from '@/lib/chain/block'
import Transaction from '@/lib/chain/transaction'
import { keccak256Regex } from '@/lib/schemas'
import { buildBlock, mock } from '@/tests/test-utils/helpers'

let block: Block
let minedBlock: Block
let corruptedBlock: Block

beforeAll(async () => {
  vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
  block = buildBlock()

  minedBlock = buildBlock()
  await minedBlock.mine()

  corruptedBlock = buildBlock()
  await corruptedBlock.mine()
  corruptedBlock.transactions[0].value += 52
  vi.useRealTimers()
})

describe('Block Class', () => {
  it('creates a valid block', () => {
    expect(block).toBeInstanceOf(Block)
    expect(block.index).toBe(mock.BLOCK_ARGS.index)
    expect(block.difficulty).toBe(mock.BLOCK_ARGS.difficulty)
    expect(block.prevHash).toBe(mock.BLOCK_ARGS.prevHash)
    expect(block.message).toBe(mock.BLOCK_ARGS.message)
    expect(block.createdAt).toBe(mock.SYSTEM_TIMESTAMP)
    expect(block.hash).toBeNull()
    expect(block.nonce).toBeNull()

    expect(block.transactions).toHaveLength(2)
    expect(block.transactions[0]).toBeInstanceOf(Transaction)
    expect(block.transactions[0].createdAt).toBe(mock.SYSTEM_TIMESTAMP)
    expect(block.transactions[1]).toBeInstanceOf(Transaction)

    block.transactions.forEach(tx => {
      expect(tx.block).toBe(block.index)
      expect(tx.hash).toMatch(keccak256Regex)
      expect(tx.status).toBe('pending')
    })
  })

  it('should correctly calculate merkel tree', () => {
    const tree = block.calculateMerkelTree()
    expect(tree).toMatchSnapshot()

    block.transactions.forEach(tx => {
      expect(tx.block).toBe(block.index)
      expect(tx.hash).toMatch(keccak256Regex)
    })
  })

  it('should correctly calculate merkel root', () => {
    const merkelRoot = block.calculateMerkelRoot()
    expect(merkelRoot).toMatchInlineSnapshot(
      `"1a17e0cc135680a1bc5790e3d235530ffe7608d3e3894a9e49923ee796e29e1d"`,
    )
  })

  it('should correctly calculate hash', () => {
    expect(() => block.calculateHash(null)).toThrowErrorMatchingInlineSnapshot(
      `[Error: nonce must be given a numerical value]`,
    )
    expect(block.calculateHash(1)).toMatchInlineSnapshot(
      `"0xc117d08b26b1957e3bda02e69f3f9a34df88e061a050358ae777f31f6566cff4"`,
    )
    expect(block.hash).toBeNull() // only mining a block assigns a hash to it
    expect(block.nonce).toBeNull() // only mining a block assigns a nonce to it
  })

  it('mines a block', () => {
    waitFor(async () => {
      const hash = await block.mine()
      expect(block.hash).toMatch(keccak256Regex)
      expect(block.hash).toBe(hash)
      expect(block.hash!.startsWith('0'.repeat(block.difficulty))).toBe(true)
      expect(block.nonce).toBeInstanceOf(Number)

      block.transactions.forEach(tx => {
        expect(tx.status).toBe('success')
      })
    })
  })

  it('should verify transactions', () => {
    const isValid = minedBlock.verifyTransactions()
    expect(isValid).toBe(true)
  })

  it('should validate itself', () => {
    const isValid = minedBlock.verify()
    expect(isValid).toBe(true)
  })

  it('should fail to verify transactions of a corrupted block', () => {
    const isValid = corruptedBlock.verifyTransactions()
    expect(isValid).toBe(false)
  })

  it('should fail to mine a mined block', async () => {
    await expect(minedBlock.mine()).rejects.toMatchInlineSnapshot(
      `"Block has already been mined"`,
    )
  })

  it("rejects if the block's transactions are invalid", async () => {
    const _block = buildBlock()
    _block.transactions[0].value += 52 // corrupt the transaction
    await expect(_block.mine()).rejects.toEqual(
      "Block's Transactions are invalid",
    )
  })

  it('should fail to validate a corrupted block', () => {
    const isValid = corruptedBlock.verify()
    expect(isValid).toBe(false)
  })

  it('should fail to match merkle tree of a corrupted block', () => {
    const tree = corruptedBlock.calculateMerkelTree()
    expect(tree).not.toMatchSnapshot()
  })

  it('should fail to match merkle root of a corrupted block', () => {
    const merkelRoot = block.calculateMerkelRoot()
    const merkelRootCorrupted = corruptedBlock.calculateMerkelRoot()

    expect(merkelRoot).toMatchInlineSnapshot(
      `"1a17e0cc135680a1bc5790e3d235530ffe7608d3e3894a9e49923ee796e29e1d"`,
    )
    expect(merkelRootCorrupted).not.toBe(merkelRoot)
  })
})
