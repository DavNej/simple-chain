import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { generateTransactionArgs } from '@/lib/chain/utils'
import { TransactionForm } from '@/components/TransactionForm'
import { mock, setup } from '@/tests/test-utils/helpers'

vi.mock('@/lib/chain/utils', () => ({
  generateTransactionArgs: vi.fn().mockReturnValue({
    from: '0x98bB108FEd80aDDB81c28f06d9c6BfDb587D1477',
    to: '0xCF56e5B9fc34D8172aC6EB92034124fFBf24B69f',
    value: 274726,
    message: 'later nails remove father leaf',
    data: '{ "molecular": "different", "iron": "take" }',
  }),
}))

const addTransaction = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
})

describe('TransactionForm', () => {
  it('renders form correctly', () => {
    render(<TransactionForm addTransaction={addTransaction} />)

    expect(generateTransactionArgs).not.toHaveBeenCalled()

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/recipient/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/value/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /randomize/i }),
    ).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const { user } = setup(<TransactionForm addTransaction={addTransaction} />)

    const fromInput = screen.getByLabelText(/from/i)
    await user.clear(fromInput)
    await user.type(fromInput, mock.ADDRESS_ALICE)

    const recipientInput = screen.getByLabelText(/recipient/i)
    await user.clear(recipientInput)
    await user.type(recipientInput, mock.ADDRESS_BOB)

    const valueInput = screen.getByLabelText(/value/i)
    await user.clear(valueInput)
    await user.type(valueInput, '500')

    const messageInput = screen.getByLabelText(/message/i)
    await user.clear(messageInput)
    await user.type(messageInput, mock.MESSAGE)

    const dataInput = screen.getByLabelText(/data/i)
    await user.clear(dataInput)
    await user.type(dataInput, mock.DATA_STRING)

    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(addTransaction).toHaveBeenCalledOnce()
    expect(addTransaction).toHaveBeenCalledWith({
      from: mock.ADDRESS_ALICE,
      to: mock.ADDRESS_BOB,
      value: 500,
      message: mock.MESSAGE,
      data: mock.DATA_STRING,
    })
  })

  it('randomize the form', async () => {
    const { user } = setup(<TransactionForm addTransaction={addTransaction} />)

    await user.click(screen.getByRole('button', { name: /randomize/i }))

    // expect(generateTransactionArgs).toHaveBeenCalledTimes(0)

    expect(
      screen.getByDisplayValue('0x98bB108FEd80aDDB81c28f06d9c6BfDb587D1477'),
    ).toBeInTheDocument()
    expect(
      screen.getByDisplayValue('0xCF56e5B9fc34D8172aC6EB92034124fFBf24B69f'),
    ).toBeInTheDocument()
    expect(screen.getByDisplayValue(274726)).toBeInTheDocument()
    expect(
      screen.getByDisplayValue('later nails remove father leaf'),
    ).toBeInTheDocument()
    expect(
      screen.getByDisplayValue('{ "molecular": "different", "iron": "take" }'),
    ).toBeInTheDocument()

    expect(generateTransactionArgs).toHaveBeenCalledTimes(1)
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
