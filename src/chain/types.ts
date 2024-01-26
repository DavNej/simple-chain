import { z } from 'zod'
import { BlockArgsSchema, TransactionArgsSchema } from './schemas'

export type BlockArgsType = z.infer<typeof BlockArgsSchema>
export type TransactionArgsType = z.infer<typeof TransactionArgsSchema>
