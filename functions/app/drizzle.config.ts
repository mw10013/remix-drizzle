import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./app/schema.ts",
  out: "./drizzle",
  // driver: 'd1',
  // dbCredentials: {
  // 	wranglerConfigPath: 'wrangler.toml',
  // 	dbName: 'd1-local',
  // },
  verbose: true,
  strict: true,
} satisfies Config;
