import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/REPOSITORY_NAME/", // Замени на свое имя репозитория
});
