import Transaction from '@/lib/chain/transaction'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import TransactionCard from './TransactionCard'

export default function Mempool({
  transactions,
}: {
  transactions: Transaction[]
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Mempool</CardTitle>
        <CardDescription>
          The memory pool is a holding area for transactions that have been
          broadcast to the network but not yet included in a block. We can see
          it as a waiting room where transactions stay until they are picked up
          by &ldquo;block builders&rdquo; and added to a new block, making them
          part of the blockchain. The mempool is where transactions are waiting
          to be confirmed and written into a block
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <ScrollArea className="flex  h-[200px] flex-col gap-2">
          {transactions.map(tx => (
            <TransactionCard key={tx.hash} tx={tx} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
