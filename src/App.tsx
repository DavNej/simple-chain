import { useState } from 'react'
import Transaction from '@/lib/chain/transaction'
import type { TransactionArgsType } from '@/lib/chain/types'
import Mempool from '@/components/Mempool'
import { TransactionForm } from '@/components/TransactionForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as Typography from '@/components/ui/typography'


export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  function addTransaction(values: TransactionArgsType) {
    const tx = new Transaction(values)
    setTransactions(state => [...state, tx])
  }

  return (
    <main className="p-8">
      <Typography.H1 className="p-8 pt-0 text-center">
        Welcome to Simple chain 👋
      </Typography.H1>

      <Tabs
        defaultValue="create-transactions"
        className="m-auto w-full md:w-1/2"
      >
        <TabsList className="w-full">
          <TabsTrigger value="create-transactions">
            Create transactions
          </TabsTrigger>
          <TabsTrigger value="mempool">Mempool</TabsTrigger>
          <TabsTrigger value="build-block">Build block</TabsTrigger>
        </TabsList>
        <TabsContent value="create-transactions">
          <TransactionForm addTransaction={addTransaction} />
        </TabsContent>
        <TabsContent value="mempool">
          <Mempool transactions={transactions} />
        </TabsContent>
        <TabsContent value="build-block">Building blocks</TabsContent>
      </Tabs>
    </main>
  )
}
