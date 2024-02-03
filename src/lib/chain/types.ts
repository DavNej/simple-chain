import * as z from 'zod'
import { transactionArgsSchema, blockArgsSchema } from './schemas'

export type TransactionArgsType = z.infer<typeof transactionArgsSchema>
export type BlockArgsType = z.infer<typeof blockArgsSchema>
