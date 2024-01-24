import { AddressSchema, SHA256Schema } from '..'

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

describe('SHA256Schema', () => {
  it('validates correct SHA-256 hashes', () => {
    expect(
      SHA256Schema.safeParse(
        '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      ).success
    ).toBeTruthy()
    expect(
      SHA256Schema.safeParse(
        'ABCDEFabcdef1234567890ABCDEFabcdef1234567890abcdef1234567890ABCD'
      ).success
    ).toBeTruthy()
  })

  it('rejects incorrect SHA-256 hashes', () => {
    expect(SHA256Schema.safeParse('123456').success).toBeFalsy()
    expect(
      SHA256Schema.safeParse(
        'XYZ1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc'
      ).success
    ).toBeFalsy()
  })
})
