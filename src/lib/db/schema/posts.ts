import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("posts", {
    id: serial().notNull().primaryKey(),
    title: text().notNull(),
    slug: text().notNull().unique(),
    content: text().notNull(),
    tags: text().array(),
    isPublished: boolean().default(false).notNull(),
    userId: integer().notNull().references(() => users.id),
    createdAt: timestamp().defaultNow().notNull()
});