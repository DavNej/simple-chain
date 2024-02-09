import { describe, expect, it } from 'vitest'
import { generateAddress } from '@/lib/crypto'
import { addressRegex } from '@/lib/schemas'

describe('generateAddress', () => {
  it('should match address regex', () => {
    const result = generateAddress()
    expect(result).toMatch(addressRegex)
  })

  it('should generate different addresses on subsequent calls', () => {
    const firstCall = generateAddress()
    const secondCall = generateAddress()
    expect(firstCall).not.toBe(secondCall)
  })
})
