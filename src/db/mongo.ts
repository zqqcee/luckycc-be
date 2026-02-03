import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL || ''

export const connectMongo = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

export { mongoose }
