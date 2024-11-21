import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import importMetaEnv from "@import-meta-env/unplugin";

export default defineConfig({
  plugins: [
    react(), importMetaEnv.vite(
      {
        example: ".env.example.public",
        env: ".env",
        transformMode: process.env.NODE_ENV === "development" ? "compile-time" : "runtime",
      }
    )
  ],
});
