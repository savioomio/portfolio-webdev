import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { DEFAULT_COUNTS, readCounts } from "./tools/storeCounts";

// https://vite.dev/config/
export default defineConfig(async ({ command, isSsrBuild, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const counts =
    command === "build"
      ? await readCounts(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY)
      : DEFAULT_COUNTS;

  return {
    plugins: [react()],
    define: {
      // Invalida o cache do navegador a cada build
      __BUILD_ID__: JSON.stringify(Date.now().toString(36)),
      // Contagens de lojas editadas no painel (ADR 0015)
      __STORE_COUNTS__: JSON.stringify(counts),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Sem sourcemap em produção: não publica o código-fonte junto do build
      // e corta o peso do upload. Use `npm run build -- --sourcemap` se precisar.
      sourcemap: false,
      rollupOptions: isSsrBuild
        ? undefined
        : {
            output: {
              manualChunks: {
                vendor: ["react", "react-dom", "react-dom/client", "react-router-dom"],
              },
            },
          },
    },
  };
});
