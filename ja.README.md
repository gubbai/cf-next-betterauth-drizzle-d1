| [English](./README.md) | 日本語 |

## Quick Reference

ローカルのD1を操作する

```
pnpm drizzle-kit generate --config drizzle-dev.config.ts
pnpm drizzle-kit migrate --config drizzle-dev.config.ts
```

リモートのD1を操作する

```
pnpm drizzle-kit generate --config drizzle-prod.config.ts
pnpm drizzle-kit migrate --config drizzle-prod.config.ts
```

## リポジトリをclone

```
git clone https://github.com/gubbai/cf-next-betterauth-drizzle-d1 PROJECT_NAME
```

- `wrangler.jsonc`の`name`
- `package.json`の`name`

を任意のプロジェクト名に変更。

## AUTH_URLの設定

```.dev.vars
BETTER_AUTH_URL=http://localhost:3000
```

## Authjs Secret の生成

```
pnpm dlx auth secret
```

これを実行すると、`.env.local` に `AUTH_SECRET` が生成されます。
生成された値を `.dev.vars` に`BETTER_AUTH_SECRET`としてコピー＆ペーストしてください。
その後、`.env.local` は削除してかまいません。

## D1を作成

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

## drizzle-kitの設定（ローカル開発用）

```
pnpm wrangler d1 execute DB_NAME --command "select 0;"
```

実行すると`.wrangler/state/v3/d1/`に`.sqlite`ファイルが生成されるので、以下のように`.env`に記述します（`.dev.vars`ではない）。


```.env
DB_FILE_NAME=.wrangler/state/v3/d1/miniflare-D1DatabaseObject/b90c27f7880c9f7a2b5f0fe8bf5088692b81a9c8993059b4d26037967f789b26.sqlite
```

## drizzle-kitの設定（リモート本番用）

```:.env
CLOUDFLARE_ACCOUNT_ID=cdaf0708f65b4c60b3c0c19bc3b56d27
CLOUDFLARE_DATABASE_ID=ebc09e31-6bba-49a9-bf0c-e9e66ca567c2
CLOUDFLARE_D1_TOKEN=ACWfgzmTnSzFrJutMYiPaxjqAhBaWhLxuMkbXQQF
```

`CLOUDFLARE_ACCOUNT_ID`: CloudflareダッシュボードのトップページURLに含まれるUUID
例: `https://dash.cloudflare.com/cdaf0708f65b4c60b3c0c19bc3b56d27/home/domains`

`CLOUDFLARE_DATABASE_ID`: `wrangler.jsonc`の`database_id`

`CLOUDFLARE_D1_TOKEN`: https://dash.cloudflare.com/profile/api-tokens で生成。
'Custom Token'で'Permissions'は`Account`, `D1`, `Edit`（必要に応じてAccount以外でも可）

## *`@better-auth/cli`

```
pnpm dlx @better-auth/cli generate --config better-auth.config.ts --output lib/schema/d1.ts
```

を実行済み。