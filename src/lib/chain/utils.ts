import * as randomWords from 'random-words'
import { generateAddress } from '../crypto'

export function generateTransactionArgs() {
  let message = randomWords.generate({ min: 1, max: 5, maxLength: 9 })
  if (typeof message !== 'string') message = message.join(' ')

  const data = (() => {
    const evenNumber = Math.floor(Math.random() * 6) + 2
    const words = randomWords.generate(evenNumber)

    const data: { [key: string]: string } = {}

    for (let i = 0; i < words.length; i += 2) {
      const key = words[i]
      const value = words[i + 1]
      data[key] = value
    }

    return JSON.stringify(data, null, 2)
  })()

  return {
    from: generateAddress(),
    to: generateAddress(),
    value: Math.floor(Math.random() * 1000000),
    message,
    data,
  }
}
