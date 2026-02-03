import { z } from 'zod'

// 图片验证 Schema
const imageSchema = z.object({
    url: z.string().url(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    blurhash: z.string().optional()
})

// 创建 Moment 的验证 Schema
export const createMomentSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    images: z.array(imageSchema).default([]),
    tags: z.array(z.string()).default([]),
    visibility: z.enum(['public', 'private', 'unlisted']).default('public')
})

// 更新 Moment 的验证 Schema
export const updateMomentSchema = z.object({
    content: z.string().min(1).optional(),
    images: z.array(imageSchema).optional(),
    tags: z.array(z.string()).optional(),
    visibility: z.enum(['public', 'private', 'unlisted']).optional()
})

// 分页查询参数验证 Schema
export const queryMomentsSchema = z.object({
    page: z.string().transform((v) => Math.max(1, parseInt(v) || 1)).default('1'),
    limit: z.string().transform((v) => Math.min(50, Math.max(1, parseInt(v) || 10))).default('10'),
    tag: z.string().optional(),
    visibility: z.enum(['public', 'private', 'unlisted']).optional()
})

export type CreateMomentInput = z.infer<typeof createMomentSchema>
export type UpdateMomentInput = z.infer<typeof updateMomentSchema>
export type QueryMomentsInput = z.infer<typeof queryMomentsSchema>
