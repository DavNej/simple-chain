import { describe, it, expect } from 'vitest'
import { transactionArgsSchema, blockArgsSchema } from '@/lib/chain/schemas'
import * as mock from 'tests/test-utils'

describe('transactionArgsSchema', () => {
  it('validates valid data', () => {
    expect(() =>
      transactionArgsSchema.parse(mock.VALID_TRANSACTION_ARGS_1),
    ).not.toThrow()
  })

  it('accepts optional "message" and "data" fields', () => {
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.VALID_TRANSACTION_ARGS_1,
        data: undefined,
        message: undefined,
      }),
    ).not.toThrow()
  })

  it('handles default value for value field', () => {
    const result = transactionArgsSchema.parse({
      ...mock.VALID_TRANSACTION_ARGS_1,
      value: undefined,
    })
    expect(result.value).toBe(0)
  })

  it('throws an error for invalid address', () => {
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.VALID_TRANSACTION_ARGS_1,
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
        },
        {
          "code": "too_small",
          "minimum": 42,
          "type": "string",
          "inclusive": true,
          "exact": true,
          "message": "String must contain exactly 42 character(s)",
          "path": [
            "from"
          ]
        }
      ]]
    `)
    expect(() =>
      transactionArgsSchema.parse({
        ...mock.VALID_TRANSACTION_ARGS_1,
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
        },
        {
          "code": "too_small",
          "minimum": 42,
          "type": "string",
          "inclusive": true,
          "exact": true,
          "message": "String must contain exactly 42 character(s)",
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
        ...mock.VALID_TRANSACTION_ARGS_1,
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
        ...mock.VALID_TRANSACTION_ARGS_1,
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
        ...mock.VALID_TRANSACTION_ARGS_1,
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
