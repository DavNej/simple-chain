import { describe, it, expect } from 'vitest'
import { AddressSchema, MessageSchema, SHA256Schema } from '@/lib/schemas'
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

describe('SHA256Schema', () => {
  it('validates valid SHA-256 hashes', () => {
    expect(() =>
      SHA256Schema.parse(
        '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      ),
    ).not.toThrow()
    expect(() =>
      SHA256Schema.parse(
        'ABCDEFabcdef1234567890ABCDEFabcdef1234567890abcdef1234567890ABCD',
      ),
    ).not.toThrow()
  })

  it('throws an error for invalid SHA-256 hashes', () => {
    expect(() => SHA256Schema.parse('123456'))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for hash",
          "path": []
        },
        {
          "code": "too_small",
          "minimum": 64,
          "type": "string",
          "inclusive": true,
          "exact": true,
          "message": "String must contain exactly 64 character(s)",
          "path": []
        }
      ]]
    `)
    expect(() =>
      SHA256Schema.parse(
        'XYZ1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc',
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "Wrong format for hash",
          "path": []
        }
      ]]
    `)
  })
})
