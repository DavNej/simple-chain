import * as z from 'zod'
import { AddressSchema, MessageSchema } from '@/lib/schemas'

export const transactionArgsSchema = z.object({
  from: AddressSchema,
  to: AddressSchema,
  value: z.coerce.number().int().lte(1e6).nonnegative().default(0),
  data: z.string().optional(),
  message: MessageSchema,
})
