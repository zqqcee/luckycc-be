import { eq, and, desc, asc } from 'drizzle-orm'
import { db } from '../index'
import { commentsTable } from '../schema'
import { getAvatarByEmail } from '@/helper/avatar'
import { postMessageSchema } from '../schema/message'
import { z } from 'zod'
export const getComments = async (pageId: string, id?: number) => {
    const pageIdHandle = eq(commentsTable.pageId, pageId);
    const approveHandle = eq(commentsTable.approved, true)
    const allComments = db.select().from(commentsTable).where(and(pageIdHandle, approveHandle)).orderBy(asc(commentsTable.createdTime))
    return allComments
}

export const postComments = async (comment: z.infer<typeof postMessageSchema>) => {
    const avatar = getAvatarByEmail(comment.email)
    return await db.insert(commentsTable).values({ ...comment, avatar });
}