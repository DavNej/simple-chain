import * as z from 'zod'
import { blockArgsSchema, transactionArgsSchema } from './schemas'

export type TransactionArgsType = z.infer<typeof transactionArgsSchema>
export type BlockArgsType = z.infer<typeof blockArgsSchema>
