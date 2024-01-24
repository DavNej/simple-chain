import type { AddressType, MessageType } from './types'
import { TransactionSchema } from './schemas/transaction'

export class Transaction {
  from: AddressType
  to: AddressType
  value: number
  data: unknown
  message: MessageType

  constructor({
    from,
    to,
    value,
    data,
    message,
  }: {
    from: AddressType
    to: AddressType
    value: number
    data: unknown
    message: MessageType
  }) {
    TransactionSchema.parse({ from, to, value, data, message })

    this.from = from
    this.to = to
    this.value = value
    this.data = data
    this.message = message
  }
}
