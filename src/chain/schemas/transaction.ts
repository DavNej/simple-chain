import { z } from 'zod'
import { AddressSchema } from '.'

export const MessageSchema = z.coerce.string().max(260).default('')
export const AmountSchema = z.number().int().lte(1e6).nonnegative()

export const TransactionSchema = z.object({
  from: AddressSchema,
  to: AddressSchema,
  amount: AmountSchema,
  data: z.unknown(),
  message: MessageSchema,
})
