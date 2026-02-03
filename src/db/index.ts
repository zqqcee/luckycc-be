import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

// PostgreSQL connection (only used when DATABASE_URL is set)
export const db = process.env.DATABASE_URL
    ? drizzle(process.env.DATABASE_URL)
    : null