import { z } from 'zod'

import { TransactionSchema, ValueSchema } from '../schemas/transaction'

export type ValueType = z.infer<typeof ValueSchema>
export type TransactionType = z.infer<typeof TransactionSchema>
