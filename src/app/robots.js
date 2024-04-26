export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/signup", "/signin"],
    },
    sitemap: "https://makodede.com/sitemap.xml",
  };
}
