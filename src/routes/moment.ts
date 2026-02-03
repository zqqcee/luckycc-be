import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { SuccessResp, ErrorResp } from '../response'
import { createMomentSchema, updateMomentSchema, queryMomentsSchema } from '../db/schema/moment'
import {
    createMoment,
    getMoments,
    getMomentById,
    updateMoment,
    deleteMoment,
    getAllTags
} from '../db/services/moments'

const app = new Hono()

// GET /moments - 获取列表（分页）
app.get('/', zValidator('query', queryMomentsSchema), async (c) => {
    try {
        const query = c.req.valid('query')
        const result = await getMoments(query)
        return c.json(SuccessResp({ data: result }))
    } catch (err) {
        console.error('Get moments error:', err)
        return c.json(ErrorResp({ msg: 'Failed to get moments' }))
    }
})

// GET /moments/tags - 获取所有标签
app.get('/tags', async (c) => {
    try {
        const tags = await getAllTags()
        return c.json(SuccessResp({ data: tags }))
    } catch (err) {
        console.error('Get tags error:', err)
        return c.json(ErrorResp({ msg: 'Failed to get tags' }))
    }
})

// GET /moments/:id - 获取单个
app.get('/:id', zValidator('param', z.object({ id: z.string() })), async (c) => {
    try {
        const { id } = c.req.valid('param')
        const moment = await getMomentById(id)
        if (!moment) {
            return c.json(ErrorResp({ code: 404, msg: 'Moment not found' }), 404)
        }
        return c.json(SuccessResp({ data: moment }))
    } catch (err) {
        console.error('Get moment error:', err)
        return c.json(ErrorResp({ msg: 'Failed to get moment' }))
    }
})

// POST /moments - 创建
app.post('/', zValidator('json', createMomentSchema), async (c) => {
    try {
        const data = c.req.valid('json')
        const moment = await createMoment(data)
        return c.json(SuccessResp({ msg: 'Moment created', data: moment }), 201)
    } catch (err) {
        console.error('Create moment error:', err)
        return c.json(ErrorResp({ msg: 'Failed to create moment' }))
    }
})

// PUT /moments/:id - 更新
app.put('/:id', zValidator('param', z.object({ id: z.string() })), zValidator('json', updateMomentSchema), async (c) => {
    try {
        const { id } = c.req.valid('param')
        const data = c.req.valid('json')
        const moment = await updateMoment(id, data)
        if (!moment) {
            return c.json(ErrorResp({ code: 404, msg: 'Moment not found' }), 404)
        }
        return c.json(SuccessResp({ msg: 'Moment updated', data: moment }))
    } catch (err) {
        console.error('Update moment error:', err)
        return c.json(ErrorResp({ msg: 'Failed to update moment' }))
    }
})

// DELETE /moments/:id - 删除
app.delete('/:id', zValidator('param', z.object({ id: z.string() })), async (c) => {
    try {
        const { id } = c.req.valid('param')
        const deleted = await deleteMoment(id)
        if (!deleted) {
            return c.json(ErrorResp({ code: 404, msg: 'Moment not found' }), 404)
        }
        return c.json(SuccessResp({ msg: 'Moment deleted' }))
    } catch (err) {
        console.error('Delete moment error:', err)
        return c.json(ErrorResp({ msg: 'Failed to delete moment' }))
    }
})

export default app
