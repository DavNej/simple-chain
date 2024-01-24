import type { AddressType } from './types'
import type { MessageType } from './types/transaction'
import { TransactionSchema } from './schemas/transaction'

export class Transaction {
  from: AddressType
  to: AddressType
  amount: number
  data: unknown
  message: MessageType

  constructor({
    from,
    to,
    amount,
    data,
    message,
  }: {
    from: AddressType
    to: AddressType
    amount: number
    data: unknown
    message: MessageType
  }) {
    TransactionSchema.parse({ from, to, amount, data, message })

    this.from = from
    this.to = to
    this.amount = amount
    this.data = data
    this.message = message
  }
}
