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

export const blockArgsSchema = z
  .object({
    index: z.number().int().nonnegative(),
    difficulty: z.number().int().nonnegative().lte(32).default(0),
    prevHash: keccak256Schema,
    message: MessageSchema,
    transactions: z.map(keccak256Schema, z.instanceof(Transaction)),
  })
  .refine(data => (data.transactions.size === 0 ? data.index === 0 : true), {
    message: 'Transactions can be empty only for Genesis block',
  })

export const transactionMapSchema = z.map(
  keccak256Schema,
  z.instanceof(Transaction),
)
