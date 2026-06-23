import { defineMiddleware } from "astro:middleware";

const productionSiteUrl = "https://designbysanne.nl";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const isGitHubMode =
    process.env.KEYSTATIC_MODE === "github" ||
    import.meta.env.PUBLIC_KEYSTATIC_MODE === "github";
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;

  if (
    isGitHubMode &&
    clientId &&
    url.pathname === "/api/keystatic/github/login"
  ) {
    const githubUrl = new URL("https://github.com/login/oauth/authorize");
    githubUrl.searchParams.set("client_id", clientId);
    githubUrl.searchParams.set(
      "redirect_uri",
      `${productionSiteUrl}/api/keystatic/github/oauth/callback`,
    );

    return Response.redirect(githubUrl.toString(), 307);
  }

  return next();
});
