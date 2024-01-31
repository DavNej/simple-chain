import { TransactionForm } from '@/components/TransactionForm'
import * as Typography from '@/components/ui/typography'

export default function App() {
  return (
    <main>
      <Typography.H1 className="p-8 text-center">
        Welcome to Simple chain 👋
      </Typography.H1>

      <div className="flex w-1/2 p-8">
        <TransactionForm />
      </div>
    </main>
  )
}
