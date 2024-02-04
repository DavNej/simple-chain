import Transaction from '@/lib/chain/transaction'

export const ADDRESS_ALICE = '0x1234567890123456789012345678901234567aaa'
export const ADDRESS_BOB = '0x1234567890123456789012345678901234567bbb'
export const ADDRESS_CHARLES = '0x1234567890123456789012345678901234567ccc'
export const ADDRESS_DAVID = '0x1234567890123456789012345678901234567ddd'

export const VALID_HASH_1 =
  'de714b432e67914f78afc4586f41c9e6879fce6716244dcfa1a84eb4ad619f73'

export const VALID_HASH_2 =
  '798ab96122c0a285c436cc7359c7dd2f84c697e45605ecbf6b9389f812ec65ee'

export const DATA_JSON = JSON.stringify({ foo: 'bar' })
export const DATA_STRING =
  '0x1234567890123456789012345678901234567ccc1234567890123456789012345678901234567ccc'

export const MESSAGE = 'Valid message'

export const VALID_TRANSACTION_ARGS_1 = {
  from: ADDRESS_ALICE,
  to: ADDRESS_BOB,
  value: 100,
  data: DATA_JSON,
  message: 'First valid message',
}

export const VALID_TRANSACTION_ARGS_2 = {
  from: ADDRESS_CHARLES,
  to: ADDRESS_DAVID,
  value: 200,
  data: DATA_STRING,
  message: 'Second valid message',
}

export function buildTransactions() {
  vi.useFakeTimers().setSystemTime(new Date('2024-01-01'))
  const transaction_1 = new Transaction(VALID_TRANSACTION_ARGS_1)
  const transaction_2 = new Transaction(VALID_TRANSACTION_ARGS_2)
  vi.useRealTimers()

  return [transaction_1, transaction_2]
}

export const TRANSACTION_1 = new Transaction(VALID_TRANSACTION_ARGS_1)
export const TRANSACTION_2 = new Transaction(VALID_TRANSACTION_ARGS_2)

export const VALID_BLOCK_ARGS = {
  index: 0,
  difficulty: 1,
  prevHash: VALID_HASH_1,
  message: 'Block message',
  transactions: [TRANSACTION_1, TRANSACTION_2],
}
