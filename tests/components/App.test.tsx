import { render, screen } from '@testing-library/react'
import App from '@/App'

test('Renders the main page', () => {
  render(<App />)
  const text = screen.getByText('Welcome to Simple chain 👋')
  expect(text).toBeDefined()
})
