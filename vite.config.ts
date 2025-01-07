import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): UserConfig => {
  return defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_BASENAME || "/bo",
    plugins: [
      react(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: [
          {
            src: "src/assets/images",
            dest: "assets",
          },
        ],
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: "https://gdenamaz.ru/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
