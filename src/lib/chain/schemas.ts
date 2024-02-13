import * as z from 'zod'
import { AddressSchema, MessageSchema, keccak256Schema } from '@/lib/schemas'
import Transaction from './transaction'

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
  prevHash: keccak256Schema,
  message: MessageSchema,
  transactions: z.instanceof(Transaction).array().nonempty(),
})
