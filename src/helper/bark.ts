import { postMessageSchema } from "@/db/schema/message"
import type { z } from "zod"
import 'dotenv/config';

export const bark = (comment: z.infer<typeof postMessageSchema>) => {
    fetch(`${process.env.BARK_URL}/${comment.pageTitle}/@${comment.username}:${comment.text}`, { method: 'GET' })
}