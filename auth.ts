import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDbAsync } from "./lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const db = await getDbAsync();
const { env } = await getCloudflareContext({ async: true });

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: env.AUTH_SECRET,
  providers: [],
});
