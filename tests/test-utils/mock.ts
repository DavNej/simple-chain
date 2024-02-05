import Transaction from '@/lib/chain/transaction'

const ADDRESS_ALICE = '0x1234567890123456789012345678901234567aaa'
const ADDRESS_BOB = '0x1234567890123456789012345678901234567bbb'
const ADDRESS_CHARLES = '0x1234567890123456789012345678901234567ccc'
const ADDRESS_DAVID = '0x1234567890123456789012345678901234567ddd'
const DATA_JSON = JSON.stringify({ foo: 'bar' })
const DATA_STRING =
  '0x1234567890123456789012345678901234567ccc1234567890123456789012345678901234567ccc'
const HASH_1 =
  'de714b432e67914f78afc4586f41c9e6879fce6716244dcfa1a84eb4ad619f73'
const HASH_2 =
  '798ab96122c0a285c436cc7359c7dd2f84c697e45605ecbf6b9389f812ec65ee'
const MESSAGE = 'A simple message for a simple chain'

const TRANSACTION_ARGS_1 = {
  from: ADDRESS_ALICE,
  to: ADDRESS_BOB,
  value: 100,
  data: DATA_JSON,
  message: 'First tx message',
}
const TRANSACTION_ARGS_2 = {
  from: ADDRESS_CHARLES,
  to: ADDRESS_DAVID,
  value: 200,
  data: DATA_STRING,
  message: 'Second tx message',
}

const TRANSACTION_1 = new Transaction(TRANSACTION_ARGS_1)
const TRANSACTION_2 = new Transaction(TRANSACTION_ARGS_2)
const TRANSACTION_BATCH = [TRANSACTION_1, TRANSACTION_2]

const BLOCK_ARGS = {
  index: 0,
  difficulty: 1,
  prevHash: HASH_1,
  message: 'Block message',
  transactions: TRANSACTION_BATCH,
}

const mock = {
  ADDRESS_ALICE,
  ADDRESS_BOB,
  ADDRESS_CHARLES,
  ADDRESS_DAVID,
  HASH_1,
  HASH_2,
  DATA_JSON,
  DATA_STRING,
  MESSAGE,
  TRANSACTION_ARGS_1,
  TRANSACTION_ARGS_2,
  TRANSACTION_1,
  TRANSACTION_2,
  BLOCK_ARGS,
}

export default mock
