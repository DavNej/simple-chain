import { z } from 'zod'
import { SHA256Regex, addressRegex } from '../utils'

export const AddressSchema = z.string().regex(addressRegex)
export const MessageSchema = z.coerce.string().max(260).default('')
export const SHA256Schema = z.string().regex(SHA256Regex)
