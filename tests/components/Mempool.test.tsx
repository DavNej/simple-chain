import { render, screen } from '@testing-library/react'
import Mempool from '@/components/Mempool'
import { buildTransactionBatch } from '@/tests/test-utils/helpers'

describe('Mempool', () => {
  it('renders without crashing', () => {
    const transactions = buildTransactionBatch()

    render(<Mempool transactions={transactions} />)

    expect(screen.getByText('Mempool')).toBeInTheDocument()
    expect(
      screen.getByText(/The memory pool is a holding area for transactions/),
    ).toBeInTheDocument()

    transactions.forEach(tx => {
      expect(screen.getByText(tx.hash)).toBeInTheDocument()
    })
  })
})
