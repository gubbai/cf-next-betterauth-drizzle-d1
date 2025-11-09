| English | [日本語](./ja.README.md) |

## Quick Reference

Operate local D1

```
pnpm drizzle-kit generate --config drizzle-dev.config.ts
pnpm drizzle-kit migrate --config drizzle-dev.config.ts
```

Operate remote D1

```
pnpm drizzle-kit generate --config drizzle-prod.config.ts
pnpm drizzle-kit migrate --config drizzle-prod.config.ts
```

## Clone the Repository

```
git clone https://github.com/gubbai/cf-next-authjs-drizzle-d1 PROJECT_NAME
```

Change the following to any project name you like:

* `name` in `wrangler.jsonc`
* `name` in `package.json`

## Configure AUTH_URL

```.dev.vars
BETTER_AUTH_URL=http://localhost:3000
```

Set this in `.dev.vars` so Auth.js callbacks resolve to your local development URL.

## Generate Authjs Secret

```
pnpm dlx auth secret
```

When you run this, `AUTH_SECRET` will be generated in `.env.local`.
Copy and paste the generated value into `.dev.vars` as `BETTER_AUTH_SECRET`.
After that, you may delete `.env.local`.

## Create D1

```
pnpm wrangler d1 create DB_NAME
```

```
✔ Would you like Wrangler to add it on your behalf? › Yes, but let me choose the binding name
✔ What binding name would you like to use? … DB
```

```
pnpm cf-typegen
```

## drizzle-kit Configuration (for Local Development)

```
pnpm wrangler d1 execute DB_NAME --command "select 0;"
```

When you run this, a `.sqlite` file will be generated under `.wrangler/state/v3/d1/`.
Add the following to your `.env` (not `.dev.vars`):

```.env
DB_FILE_NAME=.wrangler/state/v3/d1/miniflare-D1DatabaseObject/b90c27f7880c9f7a2b5f0fe8bf5088692b81a9c8993059b4d26037967f789b26.sqlite
```

## drizzle-kit Configuration (for Remote Production)

```:.env
CLOUDFLARE_ACCOUNT_ID=cdaf0708f65b4c60b3c0c19bc3b56d27
CLOUDFLARE_DATABASE_ID=ebc09e31-6bba-49a9-bf0c-e9e66ca567c2
CLOUDFLARE_D1_TOKEN=ACWfgzmTnSzFrJutMYiPaxjqAhBaWhLxuMkbXQQF
```

`CLOUDFLARE_ACCOUNT_ID`: The UUID included in the top-page URL of the Cloudflare dashboard
Example: `https://dash.cloudflare.com/cdaf0708f65b4c60b3c0c19bc3b56d27/home/domains`

`CLOUDFLARE_DATABASE_ID`: The `database_id` in `wrangler.jsonc`

`CLOUDFLARE_D1_TOKEN`: Generate it at [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens).
Choose "Custom Token" and set 'Permissions' to `Account`, `D1`, `Edit` (and others if necessary).

## *@better-auth/cli*

```
pnpm dlx @better-auth/cli generate --config better-auth.config.ts --output lib/schema/d1.ts
```

Already executed.
