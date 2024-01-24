import { z } from 'zod'
import { AddressSchema, MessageSchema, SHA256Schema } from '../schemas'

export type AddressType = z.infer<typeof AddressSchema>
export type MessageType = z.infer<typeof MessageSchema>
export type SHA256Type = z.infer<typeof SHA256Schema>
