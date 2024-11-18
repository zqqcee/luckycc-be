import { z } from 'zod'
export const postMessageSchema = z.object({
    pageId: z.string(),
    parentId: z.number().optional(),
    email: z.string(),
    url: z.string().optional(),
    text: z.string(),
    username: z.string(),
})