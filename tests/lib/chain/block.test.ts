import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import Block from '@/lib/chain/block'
import { SHA256Regex } from '@/lib/schemas'
import { mock, buildBlock } from 'tests/test-utils/helpers'

let block: Block

beforeEach(() => {
  block = buildBlock()
})

describe('Block Class', () => {
  it('creates a valid block', () => {
    expect(block).toBeInstanceOf(Block)
    expect(block.index).toBe(mock.BLOCK_ARGS.index)
    expect(block.difficulty).toBe(mock.BLOCK_ARGS.difficulty)
    expect(block.prevHash).toBe(mock.BLOCK_ARGS.prevHash)
    expect(block.transactions).toEqual(mock.BLOCK_ARGS.transactions)
    expect(block.message).toBe(mock.BLOCK_ARGS.message)
    expect(block.createdAt).toBe(mock.SYSTEM_TIMESTAMP)
    expect(block.hash).toBeNull()
    expect(block.nonce).toBeNull()
  })

  it('should correctly calculate merkel tree', () => {
    const merkelRoot = block.calculateMerkelTree()
    expect(merkelRoot).toMatchSnapshot()
  })

  it('should correctly calculate merkel root', () => {
    const merkelRoot = block.calculateMerkelRoot()
    expect(merkelRoot).toMatchInlineSnapshot(
      `"0aabce409f427daabc4cb8073eda03aef2ed7c027ada2ef122b5cec37e9b2628"`,
    )
  })

  it('should correctly calculate hash', () => {
    expect(() => block.calculateHash(null)).toThrowErrorMatchingInlineSnapshot(
      `[Error: nonce must be incremented]`,
    )
    expect(block.calculateHash(1)).toMatchInlineSnapshot(
      `"8fd41283056becd44fca189002695e869d47a748f271852d184b5b1925cb2c01"`,
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
    const isValid = block.verifyTransactions()
    expect(isValid).toBe(true)
  })

  it('should validate itself', () => {
    waitFor(async () => {
      await block.mine()
      const isValid = block.verify()
      expect(isValid).toBe(true)
    })
  })
})
