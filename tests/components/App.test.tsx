import { render, screen } from '@testing-library/react'
import App from '@/App'

test('Renders the main page', () => {
  render(<App />)
  expect(screen.getByText('Welcome to Simple chain 👋')).toBeInTheDocument()
  expect(screen.getByText('Send a transaction')).toBeInTheDocument()
})
