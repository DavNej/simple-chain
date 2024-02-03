import { describe, it, expect } from 'vitest'
import { AddressSchema, MessageSchema } from '@/lib/schemas'
import * as mock from 'tests/test-utils'

describe('AddressSchema', () => {
  it('validates valid address', () => {
    expect(() => AddressSchema.parse(mock.ADDRESS_ALICE)).not.toThrow()
  })

  it('throws an error for invalid address', () => {
    expect(() => AddressSchema.parse('invalidAddress'))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for address",
          "path": []
        },
        {
          "code": "too_small",
          "minimum": 42,
          "type": "string",
          "inclusive": true,
          "exact": true,
          "message": "String must contain exactly 42 character(s)",
          "path": []
        }
      ]]
    `)
    expect(() => AddressSchema.parse('0x123'))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for address",
          "path": []
        },
        {
          "code": "too_small",
          "minimum": 42,
          "type": "string",
          "inclusive": true,
          "exact": true,
          "message": "String must contain exactly 42 character(s)",
          "path": []
        }
      ]]
    `)
    expect(() =>
      AddressSchema.parse('0x1234567890GHIJKL1234567890abcdef12345678'),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for address",
          "path": []
        }
      ]]
    `)
    expect(() =>
      AddressSchema.parse('0x12345678901234567890123456789012345678901234'),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for address",
          "path": []
        },
        {
          "code": "too_big",
          "maximum": 42,
          "type": "string",
          "inclusive": true,
          "exact": true,
          "message": "String must contain exactly 42 character(s)",
          "path": []
        }
      ]]
    `)
  })
})

describe('MessageSchema', () => {
  it('validates valid messages', () => {
    expect(() => MessageSchema.parse('Valid message')).not.toThrow()
    expect(() => MessageSchema.parse('')).not.toThrow()
    expect(() => MessageSchema.parse(null)).not.toThrow()
    expect(() => MessageSchema.parse(123)).not.toThrow()
    expect(() => MessageSchema.parse(undefined)).not.toThrow()
  })

  it('throws an error for messages too long', () => {
    expect(() => MessageSchema.parse('a'.repeat(261)))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "too_big",
          "maximum": 260,
          "type": "string",
          "inclusive": true,
          "exact": false,
          "message": "Message can't exceed 260 characters",
          "path": []
        }
      ]]
    `)
  })
})
  })
})
