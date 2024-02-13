import { describe, expect, it } from 'vitest'
import { blockArgsSchema, transactionArgsSchema } from '@/lib/chain/schemas'
import { mock } from '@/tests/test-utils/helpers'

describe('transactionArgsSchema', () => {
  it('validates valid data', () => {
    expect(() =>
      transactionArgsSchema.parse(mock.TRANSACTION_ARGS_1),
    ).not.toThrow()
  })

  it('accepts optional "message" and "data" fields', () => {
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.TRANSACTION_ARGS_1,
        data: undefined,
        message: undefined,
      }),
    ).not.toThrow()
  })

  it('handles default value for value field', () => {
    const result = transactionArgsSchema.parse({
      ...mock.TRANSACTION_ARGS_1,
      value: undefined,
    })
    expect(result.value).toBe(0)
  })

  it('throws an error for invalid address', () => {
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.TRANSACTION_ARGS_1,
        from: 'invalid address',
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for address",
          "path": [
            "from"
          ]
        }
      ]]
    `)
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.TRANSACTION_ARGS_1,
        to: 'invalid address',
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for address",
          "path": [
            "to"
          ]
        }
      ]]
    `)
  })

  it('throws an error for non positive int value', () => {
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.TRANSACTION_ARGS_1,
        value: -100,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "too_small",
          "minimum": 0,
          "type": "number",
          "inclusive": true,
          "exact": false,
          "message": "Number must be greater than or equal to 0",
          "path": [
            "value"
          ]
        }
      ]]
    `)
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.TRANSACTION_ARGS_1,
        value: 1.3,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "invalid_type",
          "expected": "integer",
          "received": "float",
          "message": "Expected integer, received float",
          "path": [
            "value"
          ]
        }
      ]]
    `)
  })

  it('throws an error for value greater than 1.000.0000', () => {
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.TRANSACTION_ARGS_1,
        value: 1000001,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "too_big",
          "maximum": 1000000,
          "type": "number",
          "inclusive": true,
          "exact": false,
          "message": "Number must be less than or equal to 1000000",
          "path": [
            "value"
          ]
        }
      ]]
    `)
  })
})

describe('blockArgsSchema', () => {
  it('validates valid data', () => {
    expect(() => blockArgsSchema.parse(mock.BLOCK_ARGS)).not.toThrow()
  })

  it('accepts optional "message" field', () => {
    expect(() =>
      blockArgsSchema.parse({
        ...mock.BLOCK_ARGS,
        message: undefined,
      }),
    ).not.toThrow()
  })

  it('throws an error for invalid hash', () => {
    expect(() =>
      blockArgsSchema.parse({
        ...mock.BLOCK_ARGS,
        prevHash: 'invalid hash',
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for hash",
          "path": [
            "prevHash"
          ]
        }
      ]]
    `)
  })

  it('throws an error for non positive int index and difficulty', () => {
    expect(() =>
      blockArgsSchema.parse({
        ...mock.BLOCK_ARGS,
        index: -2,
        difficulty: -3,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "too_small",
          "minimum": 0,
          "type": "number",
          "inclusive": true,
          "exact": false,
          "message": "Number must be greater than or equal to 0",
          "path": [
            "index"
          ]
        },
        {
          "code": "too_small",
          "minimum": 0,
          "type": "number",
          "inclusive": true,
          "exact": false,
          "message": "Number must be greater than or equal to 0",
          "path": [
            "difficulty"
          ]
        }
      ]]
    `)
    expect(() =>
      blockArgsSchema.parse({
        ...mock.BLOCK_ARGS,
        index: 1.3,
        difficulty: 2.4,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "invalid_type",
          "expected": "integer",
          "received": "float",
          "message": "Expected integer, received float",
          "path": [
            "index"
          ]
        },
        {
          "code": "invalid_type",
          "expected": "integer",
          "received": "float",
          "message": "Expected integer, received float",
          "path": [
            "difficulty"
          ]
        }
      ]]
    `)
  })

  it('throws an error for difficulty greater than 32', () => {
    expect(() =>
      blockArgsSchema.parse({
        ...mock.BLOCK_ARGS,
        difficulty: 33,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "too_big",
          "maximum": 32,
          "type": "number",
          "inclusive": true,
          "exact": false,
          "message": "Number must be less than or equal to 32",
          "path": [
            "difficulty"
          ]
        }
      ]]
    `)
  })

  it('throws an error for empty transaction array', () => {
    expect(() =>
      blockArgsSchema.parse({
        ...mock.BLOCK_ARGS,
        transactions: [],
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "too_small",
          "minimum": 1,
          "type": "array",
          "inclusive": true,
          "exact": false,
          "message": "Array must contain at least 1 element(s)",
          "path": [
            "transactions"
          ]
        }
      ]]
    `)
  })
})
