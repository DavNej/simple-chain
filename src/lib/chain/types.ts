import * as z from 'zod'
import {
  blockArgsSchema,
  transactionArgsSchema,
  transactionMapSchema,
} from './schemas'

export type TransactionArgsType = z.infer<typeof transactionArgsSchema>
export type BlockArgsType = z.infer<typeof blockArgsSchema>
export type TransactionMapType = z.infer<typeof transactionMapSchema>
