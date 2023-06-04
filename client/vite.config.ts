import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
  envDir: path.join(__dirname, "../"),
});
