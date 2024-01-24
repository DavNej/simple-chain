import { z } from 'zod'
import { SHA256Schema } from '../schemas'

export const BlockSchema = z.object({
  index: z.number().int().nonnegative(),
  timeStamp: z.date(),
  data: z.unknown(),
  prevHash: SHA256Schema,
  nonce: z.number().int().nonnegative(),
  hash: SHA256Schema,
  difficulty: z.number().int().nonnegative().default(0),
})
