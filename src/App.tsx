import { useState } from 'react'
import Transaction from '@/lib/chain/transaction'
import type { TransactionArgsType } from '@/lib/chain/types'
import * as Typography from '@/components/ui/typography'
import { TransactionForm } from '@/components/TransactionForm'
import TransactionsTable from '@/components/TransactionsTable/TransactionsTable'
import { columns } from '@/components/TransactionsTable/columns'

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  function addTransaction(values: TransactionArgsType) {
    const tx = new Transaction(values)
    setTransactions(state => [...state, tx])
  }

  return (
    <main>
      <Typography.H1 className="p-8 text-center">
        Welcome to Simple chain 👋
      </Typography.H1>

      <div className="flex gap-4 p-8">
        <div className="w-1/3">
          <TransactionForm addTransaction={addTransaction} />
        </div>
        <div className="w-2/3">
          <TransactionsTable columns={columns} data={transactions} />
        </div>
      </div>
    </main>
  )
}
