import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL!,
}});

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite"
    }),
});