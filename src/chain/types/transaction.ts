import { z } from 'zod'

import {
  MessageSchema,
  TransactionSchema,
  AmountSchema,
} from '../schemas/transaction'

export type AmountType = z.infer<typeof AmountSchema>
export type MessageType = z.infer<typeof MessageSchema>
export type TransactionType = z.infer<typeof TransactionSchema>
