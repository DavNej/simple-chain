import { TransactionForm } from '@/components/TransactionForm'
import * as Typography from '@/components/ui/typography'
import { useState } from 'react'
import type Transaction from '@/lib/chain/transaction'

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  function addTransaction(tx: Transaction) {
    setTransactions(state => [...state, tx])
  }

  return (
    <main>
      <Typography.H1 className="p-8 text-center">
        Welcome to Simple chain 👋
      </Typography.H1>

      <div className="flex w-1/2 p-8">
        <TransactionForm addTransaction={addTransaction} />
      </div>
    </main>
  )
}
