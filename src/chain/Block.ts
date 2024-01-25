import { SHA256 } from 'crypto-js'

import type { SHA256Type, MessageType } from './types'
import type { TransactionListType } from './types/transaction'
import type { BlockType } from './types/block'

import { BlockSchema } from './schemas/block'

export default class Block implements BlockType {
  index: number
  timeStamp: Date
  difficulty: number
  prevHash: SHA256Type
  hash: SHA256Type
  nonce: number
  message: MessageType
  transactions: TransactionListType

  constructor({
    index,
    difficulty,
    prevHash,
    message,
    transactions,
  }: {
    index: number
    difficulty: number
    prevHash: SHA256Type
    transactions: TransactionListType
    message: MessageType
  }) {
    this.index = index
    this.timeStamp = new Date()
    this.difficulty = difficulty
    this.prevHash = prevHash
    this.nonce = 0
    this.message = message
    this.transactions = transactions
    this.hash = this.computeHash()

    BlockSchema.parse(this)
  }

  computeHash() {
    const hash = SHA256(
      [
        this.index,
        this.timeStamp,
        this.prevHash,
        JSON.stringify(this.transactions),
        this.nonce,
        this.message,
      ].join('')
    ).toString()

    this.hash = hash
    return this.hash
  }

  async mine() {
    console.log('⛏️ Mining block ...')

    return new Promise(resolve => {
      while (!this.hash.startsWith('0'.repeat(this.difficulty))) {
        this.nonce++
        this.computeHash()
      }

      console.log('⛏️ Block mined ! ✅', this.hash)

      resolve(this.hash)
    })
  }
}
