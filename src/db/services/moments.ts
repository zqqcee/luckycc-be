import { Moment } from '../models/moment'
import type { CreateMomentInput, UpdateMomentInput, QueryMomentsInput } from '../schema/moment'

// 创建 Moment
export const createMoment = async (data: CreateMomentInput) => {
    const moment = new Moment(data)
    await moment.save()
    return moment.toJSON()
}

// 获取 Moments 列表（分页）
export const getMoments = async (query: QueryMomentsInput) => {
    const { page, limit, tag, visibility } = query
    const skip = (page - 1) * limit

    // 构建查询条件
    const filter: Record<string, unknown> = {}
    if (tag) {
        filter.tags = tag
    }
    if (visibility) {
        filter.visibility = visibility
    }

    // 并行执行查询和计数
    const [moments, total] = await Promise.all([
        Moment.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Moment.countDocuments(filter)
    ])

    return {
        items: moments.map(m => m.toJSON()),
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + moments.length < total
    }
}

// 获取单个 Moment
export const getMomentById = async (id: string) => {
    const moment = await Moment.findById(id)
    return moment ? moment.toJSON() : null
}

// 更新 Moment
export const updateMoment = async (id: string, data: UpdateMomentInput) => {
    const moment = await Moment.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
    )
    return moment ? moment.toJSON() : null
}

// 删除 Moment
export const deleteMoment = async (id: string) => {
    const result = await Moment.findByIdAndDelete(id)
    return result !== null
}

// 获取所有标签
export const getAllTags = async () => {
    const result = await Moment.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { tag: '$_id', count: 1, _id: 0 } }
    ])
    return result
}
