import { describe, it, expect } from 'vitest'
import { formatDate } from '@/lib/utils'
import { mock } from 'tests/test-utils/helpers'

describe('formatDate', () => {
  it('should correctly format a given Date object', () => {
    const date = new Date(mock.SYSTEM_DATE)
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('01/01/24, 01:00:00')
  })

  it('should correctly format a timestamp', () => {
    const formattedDate = formatDate(mock.SYSTEM_TIMESTAMP)
    expect(formattedDate).toBe('01/01/24, 01:00:00')
  })
})
