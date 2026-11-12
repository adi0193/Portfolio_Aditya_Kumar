import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep CRA's output folder so existing Netlify settings keep working
    outDir: "build",
    // The résumé chunk (react-pdf) is lazy-loaded, so its size is acceptable
    chunkSizeWarningLimit: 700,
  },
});
