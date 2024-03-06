import { useMap } from 'usehooks-ts'
import Transaction from '@/lib/chain/transaction'
import { TransactionArgsType } from '@/lib/chain/types'

type TransactionState = {
  data: Transaction
  isSelected: boolean
}

export default function useTransactions() {
  const [transactionsMap, { set, remove }] = useMap<string, TransactionState>(
    new Map(),
  )

  const actions = {
    add(values: TransactionArgsType) {
      const tx = new Transaction(values)
      set(tx.hash, { data: tx, isSelected: false })
    },
    select(tx: Transaction) {
      set(tx.hash, { data: tx, isSelected: true })
    },
    deselect(tx: Transaction) {
      set(tx.hash, { data: tx, isSelected: false })
    },
    remove(tx: Transaction) {
      remove(tx.hash)
    },
  }

  return [transactionsMap, actions] as const
}
