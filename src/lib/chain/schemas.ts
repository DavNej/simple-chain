import * as z from 'zod'
import Transaction from './transaction'
import { AddressSchema, MessageSchema, SHA256Schema } from '@/lib/schemas'

export const transactionArgsSchema = z.object({
  from: AddressSchema,
  to: AddressSchema,
  value: z.coerce.number().int().lte(1e6).nonnegative().default(0),
  data: z.string().optional(),
  message: MessageSchema,
})

export const blockArgsSchema = z.object({
  index: z.number().int().nonnegative(),
  difficulty: z.number().int().nonnegative().lte(32).default(0),
  prevHash: SHA256Schema,
  message: MessageSchema,
  transactions: z.instanceof(Transaction).array().nonempty(),
})
