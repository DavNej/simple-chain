import { keccak256, toUtf8Bytes } from 'ethers'
import { stringToHex } from '@/lib/utils'
import type { TransactionArgsType } from './types'

type Status = 'pending' | 'success' | 'failed'

export default class Transaction {
  block: number | null
  from: string
  to: string
  value: number
  data: string | null
  message: string | null
  createdAt: number
  hash: string | null
  status: Status

  constructor({ from, to, value, data, message }: TransactionArgsType) {
    this.from = from
    this.to = to
    this.value = value || 0
    this.data = data ? stringToHex(data) : null
    this.status = 'pending'
    this.message = message || null
    this.createdAt = Date.now()
    this.hash = null
    this.block = null
  }

  calculateHash() {
    return keccak256(
      toUtf8Bytes(
        [
          this.block,
          this.data,
          this.from,
          this.to,
          this.value,
          this.createdAt,
          this.message,
        ].join(''),
      ),
    )
  }

  addToBlock(block: number) {
    this.block = block
    this.hash = this.calculateHash()
    return this.hash
  }

  verify() {
    if (this.block === null) {
      throw new Error('Block number is not set')
    }

    return this.hash === this.calculateHash()
  }

  setStatus(status: Status) {
    this.status = status
  }
}
