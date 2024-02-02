import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TransactionForm } from '@/components/TransactionForm'
import userEvent from '@testing-library/user-event'
import * as mock from 'tests/test-utils'

vi.mock('@/lib/chain/Transaction', async () => ({ default: vi.fn() }))
const addTransaction = vi.fn()

beforeEach(() => {
  addTransaction.mockReset()
  vi.resetAllMocks()
})

describe('TransactionForm', () => {
  it('renders form correctly', () => {
    render(<TransactionForm addTransaction={addTransaction} />)

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/recipient/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/value/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    render(<TransactionForm addTransaction={addTransaction} />)

    await userEvent.type(screen.getByLabelText(/from/i), mock.ADDRESS_ALICE)
    await userEvent.type(screen.getByLabelText(/recipient/i), mock.ADDRESS_BOB)
    await userEvent.type(screen.getByLabelText(/value/i), '500')
    await userEvent.type(screen.getByLabelText(/message/i), mock.MESSAGE)
    await userEvent.type(screen.getByLabelText(/data/i), mock.DATA_STRING)

    await userEvent.click(screen.getByRole('button', { name: /send/i }))

    expect(addTransaction).toHaveBeenCalledTimes(1)
    expect(addTransaction).toHaveBeenCalledWith({
      from: mock.ADDRESS_ALICE,
      to: mock.ADDRESS_BOB,
      value: 500,
      message: mock.MESSAGE,
      data: mock.DATA_STRING,
    })
  })

  it('generates a mock transaction', async () => {
    render(<TransactionForm addTransaction={addTransaction} />)

    await userEvent.click(screen.getByRole('button', { name: /generate/i }))

    expect(addTransaction).toHaveBeenCalledTimes(1)
    expect(addTransaction).toHaveBeenCalledWith({
      from: '0xA82486CF57F8d8F69f145CEF15474842a4dAB494',
      to: '0x2324D956C733a3b017e340b3aDf77D88aD95b0f4',
      value: 26,
      data: '0x49cd30044788e2203795f6a82b34132910c928fab24c01e0797a37a69bab17bb878f693700000000000000000000000000000000000000000000000000000000031d22f90',
      message: 'Hello world',
    })
  })

  it('validates fields correctly', async () => {
    render(<TransactionForm addTransaction={addTransaction} />)
    const user = userEvent.setup()

    const fromInput = screen.getByLabelText(/from/i)
    const recipientInput = screen.getByLabelText(/recipient/i)
    const valueInput = screen.getByLabelText(/value/i)

    await user.type(fromInput, 'invalid address')
    await user.type(recipientInput, 'invalid address')
    await user.clear(valueInput)
    await user.type(valueInput, '-1000')

    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(addTransaction).not.toHaveBeenCalled()

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
