import { z } from 'zod'
import { MessageSchema, SHA256Schema } from '../schemas'
import { TransactionListSchema } from './transaction'

export const BlockSchema = z.object({
  index: z.number().int().nonnegative(),
  timeStamp: z.date(),
  difficulty: z.number().int().nonnegative().lte(64).default(0),
  prevHash: SHA256Schema,
  hash: SHA256Schema,
  nonce: z.number().int().nonnegative(),
  message: MessageSchema,
  transactions: TransactionListSchema,
})

export const BlockListSchema = BlockSchema.array()
