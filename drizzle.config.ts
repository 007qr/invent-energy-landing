import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations/",
  driver: 'turso',
  // driver: "libsql",
  dbCredentials: {
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
