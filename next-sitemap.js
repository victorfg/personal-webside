module.exports = {
  siteUrl: "https://www.vfernandez.me", // URL de tu sitio web
  generateRobotsTxt: true, // Generar archivo robots.txt
  sitemapSize: 5000, // Tamaño máximo del archivo sitemap.xml
  changefreq: "daily", // Frecuencia de cambio para todas las URL del sitemap
  priority: 0.7, // Prioridad para todas las URL del sitemap
  exclude: ["/admin", "/admin/**"], // URL que no quieres incluir en el sitemap
  robotsTxtOptions: {
    additionalSitemaps: ["https://www.vfernandez.me/sitemap.xml"], // Sitemaps adicionales a incluir en el archivo robots.txt
    policies: [
      {
        userAgent: "*",
        disallow: ["/admin", "/admin/**"], // URL que no quieres que los robots de búsqueda visiten
      },
    ],
  },
};
