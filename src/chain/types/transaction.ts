import { z } from 'zod'

import { TransactionListSchema, TransactionSchema, ValueSchema } from '../schemas/transaction'

export type ValueType = z.infer<typeof ValueSchema>
export type TransactionType = z.infer<typeof TransactionSchema>
export type TransactionListType = z.infer<typeof TransactionListSchema>
