import type { TransactionArgsType } from './types'

export default class Transaction {
  from: string
  to: string
  value: number
  data: string | null
  message: string | null
  createdAt: number

  constructor({ from, to, value, data, message }: TransactionArgsType) {
    this.from = from
    this.to = to
    this.value = value || 0
    this.data = data || null
    this.message = message || null
    this.createdAt = Date.now()
  }
}
