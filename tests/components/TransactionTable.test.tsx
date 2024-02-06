import { render, screen } from '@testing-library/react'
import TransactionsTable from '@/components/TransactionsTable/TransactionsTable'
import { columns } from '@/components/TransactionsTable/columns'
import { mock, buildTransactionBatch, setup } from 'tests/test-utils/helpers'

const transactions = buildTransactionBatch()

describe('TransactionsTable', () => {
  it('renders table with data correctly', () => {
    render(<TransactionsTable columns={columns} data={transactions} />)

    // Check for presence of table headers
    expect(screen.getByText('From')).toBeInTheDocument()
    expect(screen.getByText('To')).toBeInTheDocument()
    expect(screen.getByText('Value')).toBeInTheDocument()
    expect(screen.getByText('Message')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Created at')).toBeInTheDocument()

    // Check for presence of table rows corresponding to the mock data
    expect(screen.getByText(mock.TRANSACTION_ARGS_1.from)).toBeInTheDocument()
    expect(screen.getByText(mock.TRANSACTION_ARGS_1.to)).toBeInTheDocument()
    expect(screen.getByText(mock.TRANSACTION_ARGS_1.value)).toBeInTheDocument()
    expect(screen.getByText(mock.TRANSACTION_ARGS_1.data!)).toBeInTheDocument()
    expect(
      screen.getByText(mock.TRANSACTION_ARGS_1.message!),
    ).toBeInTheDocument()

    expect(screen.getByText(mock.TRANSACTION_ARGS_2.from)).toBeInTheDocument()
    expect(screen.getByText(mock.TRANSACTION_ARGS_2.to)).toBeInTheDocument()
    expect(screen.getByText(mock.TRANSACTION_ARGS_2.value)).toBeInTheDocument()
    expect(screen.getByText(mock.TRANSACTION_ARGS_2.data!)).toBeInTheDocument()
    expect(
      screen.getByText(mock.TRANSACTION_ARGS_2.message!),
    ).toBeInTheDocument()

    expect(screen.getAllByText('01/01/24, 01:00:00')).toHaveLength(2)
  })

  it('renders empty table', () => {
    render(<TransactionsTable columns={columns} data={[]} />)

    // Check for presence of table headers
    expect(screen.getByText('From')).toBeInTheDocument()
    expect(screen.getByText('To')).toBeInTheDocument()
    expect(screen.getByText('Value')).toBeInTheDocument()
    expect(screen.getByText('Message')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Created at')).toBeInTheDocument()

    expect(screen.getByText('No results.')).toBeInTheDocument()
  })

  it('checks functionality of row selection checkbox', async () => {
    const { user } = setup(
      <TransactionsTable columns={columns} data={transactions} />,
    )

    const [firstRowCheckbox, secondRowCheckbox] = screen.getAllByRole(
      'checkbox',
      {
        name: 'Select row',
      },
    )

    await user.click(firstRowCheckbox)

    expect(firstRowCheckbox).toBeChecked()
    expect(secondRowCheckbox).not.toBeChecked()

    const firstRow = firstRowCheckbox.closest('tr')
    const secondRow = secondRowCheckbox.closest('tr')

    expect(firstRow).toHaveAttribute('data-state', 'selected')
    expect(secondRow).not.toHaveAttribute('data-state', 'selected')
  })

  it('checks functionality of select all checkbox', async () => {
    const { user } = setup(
      <TransactionsTable columns={columns} data={transactions} />,
    )

    const rowCheckboxes = screen.getAllByRole('checkbox', {
      name: 'Select row',
    })

    rowCheckboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked()
    })

    const selectAllCheckbox = screen.getByRole('checkbox', {
      name: 'Select all',
    })

    await user.click(selectAllCheckbox)

    rowCheckboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked()
      const row = checkbox.closest('tr')
      expect(row).toHaveAttribute('data-state', 'selected')
    })
  })
})
