import { z } from 'zod'
import { AddressSchema } from '../schemas'

export type AddressType = z.infer<typeof AddressSchema>
