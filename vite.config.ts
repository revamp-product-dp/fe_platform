import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig((mode) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@/": `${__dirname}/src/`,
      },
    },
    envDir: "env",
    envPrefix: "DP_",
    server: { host: "0.0.0.0", port: 3001 },
  };
});
