import { defineConfig } from "astro/config";
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  site: "https://designbysanne.nl",
  output: isProduction ? "static" : "server",
  integrations: isProduction ? [] : [react(), keystatic()],
});
