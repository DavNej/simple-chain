import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TransactionForm } from '@/components/TransactionForm'
import { mock, setup } from 'tests/test-utils/helpers'

vi.mock('@/lib/chain/utils', () => ({
  generateTransactionArgs: vi.fn().mockReturnValueOnce({
    from: '0x98bB108FEd80aDDB81c28f06d9c6BfDb587D1477',
    to: '0xCF56e5B9fc34D8172aC6EB92034124fFBf24B69f',
    value: 274726,
    message: 'later nails remove father leaf',
    data: '{\n  "molecular": "different",\n  "iron": "take"\n}',
  }),
}))

const addTransaction = vi.fn()

beforeEach(() => {
  addTransaction.mockReset()
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
    const { user } = setup(<TransactionForm addTransaction={addTransaction} />)

    await user.type(screen.getByLabelText(/from/i), mock.ADDRESS_ALICE)
    await user.type(screen.getByLabelText(/recipient/i), mock.ADDRESS_BOB)
    await user.type(screen.getByLabelText(/value/i), '500')
    await user.type(screen.getByLabelText(/message/i), mock.MESSAGE)
    await user.type(screen.getByLabelText(/data/i), mock.DATA_STRING)

    await user.click(screen.getByRole('button', { name: /send/i }))

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
    const { user } = setup(<TransactionForm addTransaction={addTransaction} />)

    await user.click(screen.getByRole('button', { name: /generate/i }))

    expect(addTransaction).toHaveBeenCalledOnce()
    expect(addTransaction).toBeCalledWith({
      from: '0x98bB108FEd80aDDB81c28f06d9c6BfDb587D1477',
      to: '0xCF56e5B9fc34D8172aC6EB92034124fFBf24B69f',
      value: 274726,
      message: 'later nails remove father leaf',
      data: '{\n  "molecular": "different",\n  "iron": "take"\n}',
    })
  })

  it('validates fields correctly', async () => {
    const { user } = setup(<TransactionForm addTransaction={addTransaction} />)

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
