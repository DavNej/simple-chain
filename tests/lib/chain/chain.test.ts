import { assert, describe, expect, it, vi } from 'vitest'
import Block from '@/lib/chain/block'
import Chain, { genesisBlockArgs } from '@/lib/chain/chain'
import { buildBlock, mock } from '@/tests/test-utils/helpers'

let chain: Chain

describe('Chain', () => {
  beforeEach(async () => {
    vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
    chain = new Chain()
    await chain.initialize()
    vi.useRealTimers()
  })

  it('should throw an error when accessing lastBlock of an empty chain', () => {
    const emptyChain = new Chain()
    expect(() => emptyChain.lastBlock).toThrowError(`Chain is empty`)
  })

  it('should initialize with a genesis block', async () => {
    vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
    const genesisBlock = buildBlock(genesisBlockArgs)
    await genesisBlock.mine()
    vi.useRealTimers()

    expect(chain.size).toBe(1)
    expect(chain.lastBlock).toBeInstanceOf(Block)
    expect(chain.lastBlock.hash).toEqual(genesisBlock.hash)
  })

  it('should set difficulty', () => {
    chain.setDifficulty(2)
    expect(chain.difficulty).toBe(2)
  })

  it('should add a valid block', async () => {
    assert(chain.lastBlock.hash)

    vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
    const block = buildBlock({
      ...mock.BLOCK_ARGS,
      prevHash: chain.lastBlock.hash,
      difficulty: chain.difficulty,
    })
    await block.mine()
    vi.useRealTimers()

    chain.addBlock(block)
    expect(chain.size).toBe(2)
    expect(chain.lastBlock).toEqual(block)
  })

  it('should not add an invalid block', async () => {
    vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
    const block = buildBlock({
      ...mock.BLOCK_ARGS,
      prevHash: 'invalid',
      difficulty: chain.difficulty,
    })
    await block.mine()
    vi.useRealTimers()

    expect(() => chain.addBlock(block)).toThrowError(
      `Block ${block.index} is invalid ⛔️`,
    )
    expect(chain.size).toBe(1)
  })

  it('should verify a valid chain', async () => {
    assert(chain.lastBlock.hash)

    vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
    const block = buildBlock({
      ...mock.BLOCK_ARGS,
      prevHash: chain.lastBlock.hash,
      difficulty: chain.difficulty,
    })
    await block.mine()
    vi.useRealTimers()

    chain.addBlock(block)
    expect(chain.size).toBe(2)

    expect(chain.verify()).toBe(true)
  })

  it('should not verify an invalid chain', () => {
    vi.useFakeTimers().setSystemTime(new Date(mock.SYSTEM_DATE))
    const block = buildBlock({
      ...mock.BLOCK_ARGS,
      prevHash:
        '0xb8b21b13f52a0158a20b2a9d029d025d242fef607078fd6977eb215476ec6586',
      difficulty: chain.difficulty,
    })
    vi.useRealTimers()
    chain.chain.set(chain.size, block)
    expect(chain.verify()).toBe(false)
  })
})
