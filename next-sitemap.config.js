const fs = require("fs");
const path = require("path");

const formatTitleForUrl = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

module.exports = {
  siteUrl: "https://www.vfernandez.me",
  generateRobotsTxt: true,
  exclude: [
    "/404",
    "/admin",
    "/admin/*",
    "/whoami",
    "/blog/*", // Excluye posts autodescubiertos (formato incorrecto), los añadimos en additionalPaths
  ],
  additionalPaths: async () => {
    const routes = [];

    // Añadir /blog (índice de posts)
    routes.push({
      loc: "/blog",
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });

    // Leer posts desde home.json y generar URLs correctas
    try {
      const homePath = path.join(process.cwd(), "content", "page", "home.json");
      const homeData = JSON.parse(fs.readFileSync(homePath, "utf-8"));
      const rows = homeData.rows || [];

      for (const row of rows) {
        const slug = formatTitleForUrl(row.title);
        routes.push({
          loc: `/blog/${slug}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: row.date ? new Date(row.date).toISOString() : new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn("next-sitemap: No se pudo leer home.json, posts no incluidos:", err.message);
    }

    return routes;
  },
};
