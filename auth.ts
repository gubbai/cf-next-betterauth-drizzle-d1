import { getDbAsync } from "./lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const db = await getDbAsync();
const { env } = await getCloudflareContext({ async: true });
Object.assign(process.env, env);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
