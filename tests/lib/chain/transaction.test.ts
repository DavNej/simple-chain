import Transaction from '@/lib/chain/transaction'
import * as mock from 'tests/test-utils'

const validArgs = {
  from: mock.ADDRESS_ALICE,
  to: mock.ADDRESS_BOB,
  value: 100,
  data: mock.DUMMY_DATA,
  message: mock.MESSAGE,
}

describe('Transaction Class', () => {
  it('creates a valid transaction', () => {
    const transaction = new Transaction(validArgs)

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.from).toBe(validArgs.from)
    expect(transaction.to).toBe(validArgs.to)
    expect(transaction.value).toBe(validArgs.value)
    expect(transaction.data).toBe(validArgs.data)
    expect(transaction.message).toBe(validArgs.message)
  })

  it('handles optional fields correctly', () => {
    const transaction = new Transaction({
      ...validArgs,
      data: undefined,
      message: undefined,
    })
    expect(transaction.data).toBeNull()
    expect(transaction.message).toBeNull()
  })
})
