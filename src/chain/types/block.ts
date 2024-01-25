import { z } from 'zod'

import { BlockListSchema, BlockSchema } from '../schemas/block'

export type BlockType = z.infer<typeof BlockSchema>
export type BlockListType = z.infer<typeof BlockListSchema>
