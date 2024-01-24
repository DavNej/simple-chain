import { z } from 'zod'
import { AddressSchema, MessageSchema } from '.'

export const ValueSchema = z.number().int().lte(1e6).nonnegative()

export const TransactionSchema = z.object({
  from: AddressSchema,
  to: AddressSchema,
  value: ValueSchema,
  data: z.unknown(),
  message: MessageSchema,
})
