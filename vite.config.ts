import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@app-api": path.resolve(__dirname, "./src/libraries/api"),
      "@app-config": path.resolve(__dirname, "./src/libraries/config"),
      "@app-component": path.resolve(__dirname, "./src/components"),
      "@app-util": path.resolve(__dirname, "./src/libraries/utils"),
      "@app-hook": path.resolve(__dirname, "./src/libraries/hooks"),
      "@app-page": path.resolve(__dirname, "./src/pages"),
    },
  },
  plugins: [react()],
});
