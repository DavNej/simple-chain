import { Block } from '../Block'
import { Transaction } from '../Transaction'
import { DUMMY_DATA, BOB, ALICE, VALID_SHA256, CHARLES } from './mock'
import { SHA256Regex } from '../utils'

describe('Block Class', () => {
  const validTransactions = [
    new Transaction({
      from: ALICE,
      to: BOB,
      amount: 100,
      data: DUMMY_DATA,
      message: 'Transaction 1',
    }),
    new Transaction({
      from: BOB,
      to: CHARLES,
      amout: 101,
      data: DUMMY_DATA,
      message: 'Transaction 2',
    }),
  ]

  const validData = {
    index: 1,
    difficulty: 1,
    prevHash: VALID_SHA256,
    transactions: validTransactions,
    message: 'Block Message',
  }

  it('creates a valid block', () => {
    const block = new Block(validData)
    expect(block).toBeInstanceOf(Block)
    expect(block.index).toBe(validData.index)
    expect(block.difficulty).toBe(validData.difficulty)
    expect(block.prevHash).toBe(validData.prevHash)
    expect(block.transactions).toEqual(validData.transactions)
    expect(block.message).toBe(validData.message)
    expect(block.timeStamp).toBeInstanceOf(Date)
    expect(block.hash).toMatch(SHA256Regex)
    expect(block.nonce).toBe(0)
  })

  it('mines a block', async () => {
    const block = new Block(validData)
    const hash = await block.mine()
    expect(block.hash).toBe(hash)
    expect(block.hash.startsWith('0'.repeat(block.difficulty))).toBe(true)
    expect(block.nonce).toBeGreaterThan(0)
  })
})
