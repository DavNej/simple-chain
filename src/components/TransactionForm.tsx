import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { TransactionArgsType } from '@/lib/chain/types'
import { transactionArgsSchema } from '@/lib/chain/schemas'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function TransactionForm({
  addTransaction,
}: {
  addTransaction: (values: TransactionArgsType) => void
}) {
  const form = useForm<TransactionArgsType>({
    resolver: zodResolver(transactionArgsSchema),
    defaultValues: {
      from: '',
      to: '',
      value: 0,
      data: '',
      message: '',
    },
  })

  function generateTx() {
    addTransaction({
      from: '0xA82486CF57F8d8F69f145CEF15474842a4dAB494',
      to: '0x2324D956C733a3b017e340b3aDf77D88aD95b0f4',
      value: 26,
      data: '0x49cd30044788e2203795f6a82b34132910c928fab24c01e0797a37a69bab17bb878f693700000000000000000000000000000000000000000000000000000000031d22f90',
      message: 'Hello world',
    })
  }

  function onSubmit(values: TransactionArgsType) {
    addTransaction(values)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a transaction</CardTitle>
        <CardDescription>
          Fill in the form to create a transaction
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>Address of the emiter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>Address of the recipient</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      placeholder="100"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Amount to send</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter message here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter data here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button type="submit" className="flex-1">
              Send
            </Button>
            <Button type="button" className="flex-1" onClick={generateTx}>
              Generate
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
