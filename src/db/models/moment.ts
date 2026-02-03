import { mongoose } from '../mongo'

const { Schema } = mongoose

// 图片子文档 Schema
const imageSchema = new Schema({
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    blurhash: { type: String }
}, { _id: false })

// Moment Schema
const momentSchema = new Schema({
    content: { type: String, required: true },
    images: { type: [imageSchema], default: [] },
    tags: { type: [String], default: [] },
    visibility: {
        type: String,
        enum: ['public', 'private', 'unlisted'],
        default: 'public'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            ret.id = ret._id.toString()
            delete ret._id
            delete ret.__v
            return ret
        }
    }
})

export const Moment = mongoose.model('Moment', momentSchema)

export type IMoment = {
    id: string
    content: string
    images: Array<{
        url: string
        width: number
        height: number
        blurhash?: string
    }>
    tags: string[]
    visibility: 'public' | 'private' | 'unlisted'
    createdAt: Date
    updatedAt: Date
}
