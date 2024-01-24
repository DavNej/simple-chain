import { z } from 'zod'

import { TransactionSchema, AmountSchema } from '../schemas/transaction'

export type AmountType = z.infer<typeof AmountSchema>
export type TransactionType = z.infer<typeof TransactionSchema>
