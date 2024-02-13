import { keccak256, toUtf8Bytes } from 'ethers'
import { stringToHex } from '@/lib/utils'
import type { TransactionArgsType } from './types'

export default class Transaction {
  from: string
  to: string
  value: number
  data: string | null
  message: string | null
  createdAt: number
  hash: string

  constructor({ from, to, value, data, message }: TransactionArgsType) {
    this.from = from
    this.to = to
    this.value = value || 0
    this.data = data ? stringToHex(data) : null
    this.message = message || null
    this.createdAt = Date.now()
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return keccak256(
      toUtf8Bytes(
        [
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

  verify() {
    return this.hash === this.calculateHash()
  }
}
