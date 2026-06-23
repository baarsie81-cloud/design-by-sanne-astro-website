import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";

const isProduction = process.env.NODE_ENV === "production";
const isLiveKeystatic = process.env.KEYSTATIC_MODE === "github";

export default defineConfig({
  site: "https://designbysanne.nl",
  output: isLiveKeystatic ? "hybrid" : !isProduction ? "server" : "static",
  adapter: isLiveKeystatic ? vercel() : undefined,
  integrations: isLiveKeystatic || !isProduction ? [react(), keystatic()] : [],
});
