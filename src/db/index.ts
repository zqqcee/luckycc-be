import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { commentsTable } from './schema'
import { eq } from 'drizzle-orm'

export const db = drizzle(process.env.DATABASE_URL!)

async function main() {
    //create
    const comment: typeof commentsTable.$inferInsert = {
        pageId: 'test1',
        email: 'test1@example.com',
        username: 'testUser1',
    }
    // await db.insert(commentsTable).values(comment)

    //query
    const comments = await db.select().from(commentsTable)
}

main()