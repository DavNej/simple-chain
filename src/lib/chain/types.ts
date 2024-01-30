import * as z from 'zod'
import { transactionArgsSchema } from './schemas'

export type TransactionArgsType = z.infer<typeof transactionArgsSchema>
