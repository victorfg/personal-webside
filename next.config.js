const withSitemap = require("next-sitemap")({
  siteUrl: "https://www.vfernandez.me",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin", "/admin/**"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://www.vfernandez.me/sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        disallow: ["/admin", "/admin/**"],
      },
    ],
  },
});

module.exports = withSitemap({
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
