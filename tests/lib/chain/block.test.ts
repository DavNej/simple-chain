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
  })

  it('should correctly calculate merkel tree', () => {
    const tree = block.calculateMerkelTree()
    expect(tree).toMatchSnapshot()
  })

  it('should correctly calculate merkel root', () => {
    const merkelRoot = block.calculateMerkelRoot()
    expect(merkelRoot).toMatchInlineSnapshot(
      `"859f814d92737c845b5a4d9c548a249def950abb1e0b7751960d90101a2157df"`,
    )
  })

  it('should correctly calculate hash', () => {
    expect(() => block.calculateHash(null)).toThrowErrorMatchingInlineSnapshot(
      `[Error: nonce must be given a numerical value]`,
    )
    expect(block.calculateHash(1)).toMatchInlineSnapshot(
      `"0x28408edf8d3fa8459741b397e5d3a2e3b7a6a2aa87feb0222aab59e570d58e17"`,
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

  it('should fail to mine a mined block', () => {
    expect(async () => await minedBlock.mine()).rejects.toMatchInlineSnapshot(
      `"Block has already been mined"`,
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
      `"859f814d92737c845b5a4d9c548a249def950abb1e0b7751960d90101a2157df"`,
    )
    expect(merkelRootCorrupted).not.toBe(merkelRoot)
  })
})
