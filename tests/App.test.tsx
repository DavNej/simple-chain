import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'

it('Renders the main page', () => {
  render(<App />)
  expect(screen.getByText('Welcome to Simple chain 👋')).toBeInTheDocument()
  expect(screen.getByText('New transaction')).toBeInTheDocument()
  expect(screen.getByText('No results.')).toBeInTheDocument()
})
