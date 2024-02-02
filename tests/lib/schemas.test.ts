import { describe, it, expect } from 'vitest'
import { AddressSchema, MessageSchema } from '@/lib/schemas'
import * as mock from 'tests/test-utils'

describe('AddressSchema', () => {
  it('validates correct wallet addresses', () => {
    expect(AddressSchema.safeParse(mock.ADDRESS_ALICE).success).toBeTruthy()
  })

  it('rejects incorrect wallet addresses', () => {
    expect(AddressSchema.safeParse('invalidAddress').success).toBeFalsy()
    expect(AddressSchema.safeParse('0x123').success).toBeFalsy()
    expect(
      AddressSchema.safeParse('0x1234567890GHIJKL1234567890abcdef12345678')
        .success,
    ).toBeFalsy()
    expect(
      AddressSchema.safeParse('0x12345678901234567890123456789012345678901234')
        .success,
    ).toBeFalsy()
  })
})

describe('MessageSchema', () => {
  it('validates correct messages', () => {
    expect(MessageSchema.safeParse('Valid message').success).toBeTruthy()
    expect(MessageSchema.safeParse('').success).toBeTruthy()
    expect(MessageSchema.safeParse(null).success).toBeTruthy()
    expect(MessageSchema.safeParse(123).success).toBeTruthy()
    expect(MessageSchema.safeParse(undefined).success).toBeTruthy()
  })

  it('rejects messages too long', () => {
    expect(MessageSchema.safeParse('a'.repeat(261)).success).toBeFalsy()
  })
})
