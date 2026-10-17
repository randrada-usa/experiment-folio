import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { projects } from "./src/content.ts";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        projects: "projects/index.html",
        certifications: "certifications/index.html",
        cv: "cv/index.html",
        ...Object.fromEntries(
          projects.map((project) => [
            project.slug,
            `projects/${project.slug}/index.html`,
          ]),
        ),
      },
    },
  },
  server: { port: 5173, strictPort: true },
});
