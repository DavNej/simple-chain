import { describe, it, expect } from 'vitest'
import { generateTransactionArgs } from '@/lib/chain/utils'
import { transactionArgsSchema } from '@/lib/chain/schemas'

describe('generateTransactionArgs', () => {
  it('should return an object with from, to, value, message, and data properties', () => {
    const transactionArgs = generateTransactionArgs()

    expect(transactionArgs).toHaveProperty('from')
    expect(transactionArgs).toHaveProperty('to')
    expect(transactionArgs).toHaveProperty('value')
    expect(transactionArgs).toHaveProperty('message')
    expect(transactionArgs).toHaveProperty('data')

    expect(() => transactionArgsSchema.parse(transactionArgs)).not.toThrow()
  })

  it('should generate data as a valid JSON string of an even number of word pairs', () => {
    const transactionArgs = generateTransactionArgs()
    expect(() => JSON.parse(transactionArgs.data)).not.toThrow()
  })
})
