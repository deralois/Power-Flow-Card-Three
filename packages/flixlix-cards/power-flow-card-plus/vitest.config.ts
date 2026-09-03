import path from "node:path";
import process from "node:process";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import packageJson from "./package.json";

const packageName = packageJson.name;

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ["./tsconfig.json", "../../shared/tsconfig.json"] })],
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: `${path.resolve(process.cwd(), "../../shared/src")}/`,
      },
    ],
  },
  test: {
    name: packageName,
    globals: true,
    environment: "jsdom",
    alias: [
      {
        find: /^@\//,
        replacement: `${path.resolve(process.cwd(), "../../shared/src")}/`,
      },
    ],
    server: {
      deps: {
        inline: [/lit/, /@lit/, /@repo/, /@flixlix-cards\/shared/],
      },
    },
    include: ["__tests__/**/*.test.ts", "src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
