import Transaction from '@/lib/chain/transaction'
import { BlockArgsType, TransactionArgsType } from '@/lib/chain/types'

import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import Block from '@/lib/chain/block'

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
const SYSTEM_DATE = '2024-01-01'
const SYSTEM_TIMESTAMP = 1704067200000

// * Transaction helpers

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

export function buildTransaction(transactionArgs?: TransactionArgsType) {
  return new Transaction(transactionArgs || TRANSACTION_ARGS_1)
}

export function buildTransactionBatch(
  transactionArgsArray?: TransactionArgsType[],
) {
  const args = transactionArgsArray || [TRANSACTION_ARGS_1, TRANSACTION_ARGS_2]

  if (args.length === 0)
    throw new Error(
      'At least 1 Transaction is needed to make a transaction batch',
    )

  return args.map(txArgs => buildTransaction(txArgs)) as [
    Transaction,
    ...Transaction[],
  ]
}

// * Block helpers

const BLOCK_ARGS = {
  index: 1,
  difficulty: 1,
  prevHash: HASH_1,
  message: 'Block message',
  transactions: buildTransactionBatch(),
}

export function buildBlock(blockArgs?: BlockArgsType) {
  return new Block(
    blockArgs || {
      ...BLOCK_ARGS,
      transactions: buildTransactionBatch(),
    },
  )
}

// * General helpers

export function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

export const mock = {
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
  BLOCK_ARGS,
  SYSTEM_TIMESTAMP,
  SYSTEM_DATE,
}
