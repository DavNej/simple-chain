import { Transaction } from '../Transaction'

export const ALICE = '0x1234567890123456789012345678901234567aaa'
export const BOB = '0x1234567890123456789012345678901234567bbb'
export const CHARLES = '0x1234567890123456789012345678901234567ccc'
export const DAVID = '0x1234567890123456789012345678901234567ddd'
export const ERIC = '0x1234567890123456789012345678901234567eee'

export const VALID_SHA256 =
  'de714b432e67914f78afc4586f41c9e6879fce6716244dcfa1a84eb4ad619f73'

export const VALID_SHA256_2 =
  '798ab96122c0a285c436cc7359c7dd2f84c697e45605ecbf6b9389f812ec65ee'

export const DUMMY_DATA = { foo: 'bar' }

export const MESSAGE = 'Valid message'

export const VALID_TRANSACTION_ARGS = {
  from: ALICE,
  to: BOB,
  amount: 101,
  data: DUMMY_DATA,
  message: MESSAGE,
}

export const TRANSACTION = new Transaction(VALID_TRANSACTION_ARGS)
