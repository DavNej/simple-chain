import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { formatDate } from '@/lib/utils'
import TransactionCard from '@/components/TransactionCard'
import { buildTransaction } from '@/tests/test-utils/helpers'

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
    expect(screen.getByText(/status/i)).toBeInTheDocument()
    expect(screen.getByText(mockTransaction.status)).toBeInTheDocument()
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
