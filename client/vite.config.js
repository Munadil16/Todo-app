import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    open: "/",
    proxy: {
      "/api/v1": "http://localhost:4000",
    },
  },
  plugins: [react()],
});
