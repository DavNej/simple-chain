import { AddressSchema } from '..'

describe('AddressSchema', () => {
  it('validates correct addresses', () => {
    expect(
      AddressSchema.safeParse('0x1234567890abcdef1234567890abcdef12345678')
        .success
    ).toBeTruthy()
    expect(
      AddressSchema.safeParse('0xABCDEFabcdef1234567890ABCDEFabcdef123456')
        .success
    ).toBeTruthy()
  })

  it('rejects incorrect addresses', () => {
    expect(AddressSchema.safeParse('0x12345').success).toBeFalsy()
    expect(
      AddressSchema.safeParse('0x1234567890GHIJKL1234567890abcdef12345678')
        .success
    ).toBeFalsy()
    expect(
      AddressSchema.safeParse('1234567890abcdef1234567890abcdef12345678')
        .success
    ).toBeFalsy()
  })
})
