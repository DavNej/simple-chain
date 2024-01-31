import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TransactionForm } from '@/components/TransactionForm'
import Transaction from '@/lib/chain/transaction'
import userEvent from '@testing-library/user-event'
import * as mock from 'tests/test-utils'

vi.mock('@/lib/chain/Transaction', async () => ({ default: vi.fn() }))

beforeEach(() => {
  vi.resetAllMocks()
})

describe('TransactionForm', () => {
  it('renders form correctly', () => {
    render(<TransactionForm />)

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/recipient/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/value/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    render(<TransactionForm />)

    await userEvent.type(screen.getByLabelText(/from/i), mock.ADDRESS_ALICE)
    await userEvent.type(screen.getByLabelText(/recipient/i), mock.ADDRESS_BOB)
    await userEvent.type(screen.getByLabelText(/value/i), '500')
    await userEvent.type(screen.getByLabelText(/message/i), mock.MESSAGE)
    await userEvent.type(screen.getByLabelText(/data/i), mock.DATA_STRING)

    await userEvent.click(screen.getByRole('button', { name: /send/i }))

    expect(Transaction).toHaveBeenCalledWith({
      from: mock.ADDRESS_ALICE,
      to: mock.ADDRESS_BOB,
      value: 500,
      message: mock.MESSAGE,
      data: mock.DATA_STRING,
    })
  })

  it('validates fields correctly', async () => {
    render(<TransactionForm />)
    const user = userEvent.setup()

    const fromInput = screen.getByLabelText(/from/i)
    const recipientInput = screen.getByLabelText(/recipient/i)
    const valueInput = screen.getByLabelText(/value/i)

    await user.type(fromInput, 'invalid address')
    await user.type(recipientInput, 'invalid address')
    await user.clear(valueInput)
    await user.type(valueInput, '-1000')

    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(Transaction).not.toHaveBeenCalled()

    const fromErr = document.getElementById(`${fromInput.id}-message`)
      ?.textContent
    const recipientErr = document.getElementById(`${recipientInput.id}-message`)
      ?.textContent
    const valueErr = document.getElementById(`${valueInput.id}-message`)
      ?.textContent

    expect(fromErr).toMatchInlineSnapshot(`"Wrong format for address"`)
    expect(recipientErr).toMatchInlineSnapshot(`"Wrong format for address"`)
    expect(valueErr).toMatchInlineSnapshot(
      `"Number must be greater than or equal to 0"`,
    )
  })
})
