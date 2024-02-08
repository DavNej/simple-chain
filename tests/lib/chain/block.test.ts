import { describe, it, expect, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import Block from '@/lib/chain/block'
import { SHA256Regex } from '@/lib/schemas'
import { mock, buildBlock } from 'tests/test-utils/helpers'
import Transaction from '@/lib/chain/transaction'

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
      `"0aabce409f427daabc4cb8073eda03aef2ed7c027ada2ef122b5cec37e9b2628"`,
    )
  })

  it('should correctly calculate hash', () => {
    expect(() => block.calculateHash(null)).toThrowErrorMatchingInlineSnapshot(
      `[Error: nonce must be given a numerical value]`,
    )
    expect(block.calculateHash(1)).toMatchInlineSnapshot(
      `"bf4acd3281cb433417cb4dafb6be65b83eff1248e621509175d5a0b2cbb9e0b8"`,
    )
    expect(block.hash).toBeNull() // only mining a block assigns a hash to it
    expect(block.nonce).toBeNull() // only mining a block assigns a nonce to it
  })

  it('mines a block', () => {
    waitFor(async () => {
      const hash = await block.mine()
      expect(block.hash).toMatch(SHA256Regex)
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
      `"0aabce409f427daabc4cb8073eda03aef2ed7c027ada2ef122b5cec37e9b2628"`,
    )
    expect(merkelRootCorrupted).not.toBe(merkelRoot)
  })
})
