import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'
import { setup } from 'tests/test-utils/helpers'

describe('App component', () => {
  it('renders the main application', () => {
    render(<App />)

    expect(screen.getByText('Welcome to Simple chain 👋')).toBeInTheDocument()
    expect(screen.getByText('Create transactions')).toBeInTheDocument()
    expect(screen.getByText('Mempool')).toBeInTheDocument()
    expect(screen.getByText('Build block')).toBeInTheDocument()
  })

  it('allows users to navigate between tabs', async () => {
    const { user } = setup(<App />)

    expect(screen.getByText('New transaction')).toBeInTheDocument()

    await user.click(screen.getByText('Mempool'))
    expect(screen.getByText(/The memory pool/)).toBeInTheDocument()

    await user.click(screen.getByText('Build block'))
    expect(screen.getByText('Building blocks')).toBeInTheDocument()

    await user.click(screen.getByText('Create transactions'))
    expect(screen.getByText('New transaction')).toBeInTheDocument()
  })
})
