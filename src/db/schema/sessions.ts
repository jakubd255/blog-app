import { serial, pgTable, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const sessions = pgTable("sessions", {
    id: serial().notNull().primaryKey(),
    userId: integer().notNull().references(() => users.id),
    createdAt: timestamp().defaultNow(),
    expiresAt: timestamp().notNull()
});

export const sessionsRelations = relations(sessions, ({one}) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    })
}));