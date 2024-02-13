import { describe, expect, it } from 'vitest'
import { transactionArgsSchema } from '@/lib/chain/schemas'
import { generateTransactionArgs } from '@/lib/chain/utils'

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

  it('should have a value lower than 1000', () => {
    const transactionArgs = generateTransactionArgs()
    expect(transactionArgs.value).toBeLessThanOrEqual(1000)
  })

  it('should generate data as a valid JSON string of an even number of word pairs', () => {
    const transactionArgs = generateTransactionArgs()
    expect(() => JSON.parse(transactionArgs.data)).not.toThrow()
  })
})
