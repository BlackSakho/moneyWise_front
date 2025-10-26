import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚙️ Configuration Tailwind/PostCSS corrigée
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
});
