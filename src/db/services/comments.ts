import { eq } from 'drizzle-orm'
import { db } from '../index'
import { commentsTable } from '../schema'
import { getAvatarByEmail } from '@/helper/avatar'
import { postMessageSchema } from '../schema/message'
import { z } from 'zod'
export const getComments = async (pageId: string, id?: number) => {
    const allComments = db.select().from(commentsTable);
    return id ? await allComments.where(eq(commentsTable.id, id)) : await allComments
}

export const postComments = async (comment: z.infer<typeof postMessageSchema>) => {
    const avatar = getAvatarByEmail(comment.email)
    return await db.insert(commentsTable).values({ ...comment, avatar });
}