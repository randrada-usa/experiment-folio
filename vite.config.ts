import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        projects: "projects/index.html",
        certifications: "certifications/index.html",
      },
    },
  },
  server: { port: 5173, strictPort: true },
});
