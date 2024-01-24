import { z } from 'zod'

export const AddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/)
export const SHA256Schema = z.string().regex(/^[a-fA-F0-9]{64}$/)
