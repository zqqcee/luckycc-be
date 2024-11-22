import { Hono } from 'hono'
import { getComments, postComments } from '@/db/services/comments'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { SuccessResp, ErrorResp } from '@/response'
import { postMessageSchema } from '@/db/schema/message'

const app = new Hono()

app.get('/', zValidator('query', z.object({
    pageId: z.string(),
    id: z.string().transform((v) => parseInt(v)).optional()
})), async (c) => {
    const id = c.req.valid('query').id
    const pageId = c.req.valid('query').pageId
    const comments = await getComments(pageId, id)
    return c.json(SuccessResp({ data: comments }))
})

// app.post('/', zValidator('form', postMessageSchema), async (c) => {
//     const comment = await c.req.valid('form');
//     try {
//         const response = await postComments(comment);
//         return c.json(SuccessResp({ data: response.rowCount }))
//     } catch (err) {
//         return c.json(ErrorResp());
//     }
// })
app.post('/', zValidator('json', postMessageSchema), async (c) => {
    const comment = await c.req.valid('json');
    try {
        const response = await postComments(comment);
        return c.json(SuccessResp({ data: response.rowCount }))
    } catch (err) {
        return c.json(ErrorResp());
    }
})

export default app;
