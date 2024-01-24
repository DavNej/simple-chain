import { Transaction } from '../Transaction'

describe('Transaction Class', () => {
  const validData = {
    from: '0x1234567890123456789012345678901234567aaa',
    to: '0x1234567890123456789012345678901234567bbb',
    amount: 100,
    data: { foo: 'bar' },
    message: 'Valid message',
  }

  it('creates a valid transaction', () => {
    const transaction = new Transaction(validData)

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.from).toBe(validData.from)
    expect(transaction.to).toBe(validData.to)
    expect(transaction.amount).toBe(validData.amount)
    expect(transaction.message).toBe(validData.message)
  })

  it('throws error with invalid transaction data', () => {
    const invalidData = { ...validData, from: 'invalidAddress' }
    expect(() => new Transaction(invalidData)).toThrow()
  })
})
