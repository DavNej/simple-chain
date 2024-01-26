import { z } from 'zod'
import Transaction from './Transaction'

export const addressRegex = /^0x[a-fA-F0-9]{40}$/
export const SHA256Regex = /^[a-fA-F0-9]{64}$/

export const AddressSchema = z.string().regex(addressRegex)
export const MessageSchema = z.coerce.string().max(260).default('')

export const BlockArgsSchema = z.object({
  index: z.number().int().nonnegative(),
  difficulty: z.number().int().nonnegative().lte(64).default(0),
  prevHash: z.string().regex(SHA256Regex),
  message: MessageSchema,
  transactions: z.instanceof(Transaction).array(),
})

export const TransactionArgsSchema = z.object({
  from: AddressSchema,
  to: AddressSchema,
  value: z.number().int().lte(1e6).nonnegative(),
  data: z.unknown(),
  message: MessageSchema,
})
