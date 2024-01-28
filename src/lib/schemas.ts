import { z } from 'zod'

export const addressRegex = /^0x[a-fA-F0-9]{40}$/
export const SHA256Regex = /^[a-fA-F0-9]{64}$/

export const AddressSchema = z
  .string()
  .regex(addressRegex, { message: 'Wrong format for address' })
  .length(42)

export const MessageSchema = z.coerce
  .string()
  .max(260, {
    message: "Message can't exceed 260 characters",
  })
  .optional()
