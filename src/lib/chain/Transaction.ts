export default class Transaction {
  from: string
  to: string
  value: number
  data: string | null
  message: string | null

  constructor({
    from,
    to,
    value,
    data,
    message,
  }: {
    from: string
    to: string
    value: number
    data?: string
    message?: string
  }) {
    this.from = from
    this.to = to
    this.value = value || 0
    this.data = data || null
    this.message = message || null
  }
}
