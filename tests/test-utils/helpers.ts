import Transaction from '@/lib/chain/transaction'
import { TransactionArgsType } from '@/lib/chain/types'
import mock from './mock'

export function buildTransaction(
  transactionArgs: TransactionArgsType = mock.TRANSACTION_ARGS_1,
) {
  vi.useFakeTimers().setSystemTime(new Date('2024-01-01'))
  const transaction = new Transaction(transactionArgs)
  vi.useRealTimers()
  return transaction
}

export function buildTransactionBatch(
  transactions: TransactionArgsType[] = [
    mock.TRANSACTION_ARGS_1,
    mock.TRANSACTION_ARGS_2,
  ],
) {
  return transactions.map(tx => buildTransaction(tx))
}
