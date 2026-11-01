import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { DEFAULT_COUNTS } from "./tools/storeCounts";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __BUILD_ID__: JSON.stringify("teste"),
    __STORE_COUNTS__: JSON.stringify(DEFAULT_COUNTS),
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.test.{ts,tsx}", "tools/**/*.test.ts"],
    css: false,
    restoreMocks: true,
  },
});
