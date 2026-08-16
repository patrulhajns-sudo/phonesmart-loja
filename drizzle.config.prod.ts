import "dotenv/config";
import { defineConfig } from "drizzle-kit";

/**
 * Config do Drizzle para PRODUÇÃO.
 *
 * Use quando for criar as tabelas no banco da nuvem (Neon, Supabase, Railway...):
 *
 *   DATABASE_URL="postgresql://..." npx drizzle-kit push --config=drizzle.config.prod.ts
 *
 * O arquivo drizzle.config.json continua servindo para o banco local.
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
