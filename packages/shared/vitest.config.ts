import path from "node:path";
import process from "node:process";
import { defineConfig } from "vitest/config";
import packageJson from "./package.json";

const packageName = packageJson.name;

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: `${path.resolve(process.cwd(), "src")}/`,
      },
    ],
  },
  test: {
    name: packageName,
    globals: true,
    environment: "node",
    alias: [
      {
        find: /^@\//,
        replacement: `${path.resolve(process.cwd(), "src")}/`,
      },
    ],
    server: {
      deps: {
        inline: [/lit/, /@lit/, /@repo/],
      },
    },
    include: ["__tests__/**/*.test.ts", "src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
