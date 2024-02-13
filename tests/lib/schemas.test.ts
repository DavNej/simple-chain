import { describe, expect, it } from 'vitest'
import { AddressSchema, MessageSchema, keccak256Schema } from '@/lib/schemas'
import { mock } from '@/tests/test-utils/helpers'

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
        }
      ]]
    `)
  })
})

describe('MessageSchema', () => {
  it('validates valid messages', () => {
    expect(() => MessageSchema.parse(mock.MESSAGE)).not.toThrow()
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

describe('keccak256Schema', () => {
  it('validates valid keccak-256 hashes', () => {
    expect(() => keccak256Schema.parse(mock.HASH_1)).not.toThrow()
  })

  it('throws an error for invalid keccak-256 hashes', () => {
    expect(() => keccak256Schema.parse('123456'))
      .toThrowErrorMatchingInlineSnapshot(`
        [ZodError: [
          {
            "validation": "regex",
            "code": "invalid_string",
            "message": "Wrong format for hash",
            "path": []
          }
        ]]
      `)
    expect(() =>
      keccak256Schema.parse(
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
