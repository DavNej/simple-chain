import { z } from 'zod'

import { BlockSchema } from '../schemas/block'

export type BlockType = z.infer<typeof BlockSchema>
