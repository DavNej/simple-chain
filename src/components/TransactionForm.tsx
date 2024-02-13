import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { transactionArgsSchema } from '@/lib/chain/schemas'
import type { TransactionArgsType } from '@/lib/chain/types'
import { generateTransactionArgs } from '@/lib/chain/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const defaultFormValues = generateTransactionArgs()

export function TransactionForm({
  addTransaction,
}: {
  addTransaction: (values: TransactionArgsType) => void
}) {
  const form = useForm<TransactionArgsType>({
    resolver: zodResolver(transactionArgsSchema),
    defaultValues: defaultFormValues,
  })

  function fillFields() {
    const { from, to, value, message, data } = generateTransactionArgs()
    form.clearErrors()

    form.setValue('from', from)
    form.setValue('to', to)
    form.setValue('value', value)
    form.setValue('message', message)
    form.setValue('data', data)
  }

  function onSubmit(values: TransactionArgsType) {
    addTransaction(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New transaction</CardTitle>
        <CardDescription>
          Fill in the form to create a transaction then click the send button to
          broacast it
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
                    <Input
                      placeholder="0x4196E2B8aadd802200773dF82Ac318EEbD1dDcD4"
                      {...field}
                    />
                  </FormControl>
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
                    <Input
                      placeholder="0x3fefCaA5aa169A63F4f3EFbf7192B65Ec8c1aB68"
                      {...field}
                    />
                  </FormControl>
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
                      placeholder="123456"
                      {...field}
                    />
                  </FormControl>
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
                    <Textarea
                      placeholder="Hey! I am sending you my name also"
                      {...field}
                    />
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
                    <Textarea
                      className="h-[130px]"
                      placeholder='{ "name": "John Doe" }'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={fillFields}
            >
              <Sparkles className="mr-2 size-4" />
              Randomize
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="mr-2 size-4" />
              Send
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
