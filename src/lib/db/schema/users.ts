import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const users = pgTable("users", {
    id: serial().notNull().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    profileImage: text(),
    bio: text(),
    links: text().array(),
    role: text({enum: ["USER", "ADMIN"]}).notNull().default("USER"),
    createdAt: timestamp().defaultNow().notNull()
});

export const usersRelations = relations(users, ({many}) => ({
    emails: many(users)
}));