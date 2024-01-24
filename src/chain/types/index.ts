import { z } from 'zod'
import { AddressSchema, SHA256Schema } from '../schemas'

export type AddressType = z.infer<typeof AddressSchema>
export type SHA256Type = z.infer<typeof SHA256Schema>
