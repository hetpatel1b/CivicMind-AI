import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [
      "lib/admin/**/*.ts",
      "services/**/*.ts",
      "app/api/admin/**/*.ts",
      "app/admin/**/*.ts",
      "app/admin/**/*.tsx"
    ],
    rules: {
      "no-restricted-imports": ["error", {
        "paths": [{
          "name": "@/lib/admin/supabase-admin",
          "message": "createAdminClient bypasses RLS and should only be used in secure admin APIs and scripts."
        }]
      }]
    }
  }
]);

export default eslintConfig;
