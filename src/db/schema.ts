import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";


export const commentsTable = pgTable("comments", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    pageId: varchar({ length: 255 }).notNull(),
    parentId: integer(),
    email: varchar({ length: 255 }).notNull(),
    url: varchar({ length: 255 }),
    username: varchar({ length: 255 }).notNull().unique(),
    createdTime: timestamp().notNull().defaultNow(),
    approved: boolean().default(false),
    text: varchar({ length: 255 }).notNull(),
    avatar: varchar({ length: 255 }).notNull(),
});



