import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TransactionCard from '@/components/TransactionCard'
import { buildTransaction } from 'tests/test-utils/helpers'
import { formatDate } from '@/lib/utils'

describe('TransactionCard', () => {
  it('renders correctly with given transaction details', () => {
    const mockTransaction = buildTransaction()
    render(<TransactionCard tx={mockTransaction} />)

    expect(
      screen.getByText(mockTransaction.hash.slice(2, 4).toUpperCase()),
    ).toBeInTheDocument()

    expect(screen.getByText(mockTransaction.hash)).toBeInTheDocument()

    expect(screen.getByText(/from/i)).toBeInTheDocument()
    expect(screen.getByText(mockTransaction.from)).toBeInTheDocument()
    expect(screen.getByText(/to/i)).toBeInTheDocument()
    expect(screen.getByText(mockTransaction.to)).toBeInTheDocument()
    expect(screen.getByText(/value/i)).toBeInTheDocument()
    expect(screen.getByText(mockTransaction.value)).toBeInTheDocument()
    expect(screen.getByText(/date/i)).toBeInTheDocument()
    expect(
      screen.getByText(formatDate(mockTransaction.createdAt)),
    ).toBeInTheDocument()
    expect(screen.getByText(/message/i)).toBeInTheDocument()
    expect(screen.getByText(mockTransaction.message!)).toBeInTheDocument()
    expect(screen.getByText(/data/i)).toBeInTheDocument()
    expect(screen.getByText(mockTransaction.data!)).toBeInTheDocument()
  })
})
