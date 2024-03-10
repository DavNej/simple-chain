import { type RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Block from '@/lib/chain/block'
import Transaction from '@/lib/chain/transaction'
import { BlockArgsType, TransactionArgsType } from '@/lib/chain/types'

const ADDRESS_ALICE = '0x1234567890123456789012345678901234567aaa'
const ADDRESS_BOB = '0x1234567890123456789012345678901234567bbb'
const ADDRESS_CHARLES = '0x1234567890123456789012345678901234567ccc'
const ADDRESS_DAVID = '0x1234567890123456789012345678901234567ddd'
const DATA_JSON = JSON.stringify({ foo: 'bar' })
const DATA_STRING = 'Hello world! This is some random string for data'
const HASH_1 =
  '0x4acbb0ebbf918f2535d0cd50a6b3624dc95c455f07c7a2dbc8b641083536d768'
const HASH_2 =
  '0xec9f75fa9450afb8ea02c70c8748ddb8af7f8c2251cdf1e4ec1c8a09b6349e1d'
const MESSAGE = 'This is a simple chain'
const SYSTEM_DATE = '2024-01-01'
const SYSTEM_TIMESTAMP = 1704067200000

// * Transaction helpers

const TRANSACTION_ARGS_1 = {
  from: ADDRESS_ALICE,
  to: ADDRESS_BOB,
  value: 100,
  data: DATA_JSON,
  message: 'This is the First tx',
}

const TRANSACTION_ARGS_2 = {
  from: ADDRESS_CHARLES,
  to: ADDRESS_DAVID,
  value: 200,
  data: DATA_STRING,
  message: 'This is the Second tx',
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

  return args.map(txArgs => buildTransaction(txArgs))
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
  return new Block(blockArgs || BLOCK_ARGS)
}

// * General helpers

export function setup(jsx: React.ReactElement, options?: RenderOptions) {
  return {
    user: userEvent.setup(),
    ...render(jsx, options),
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
