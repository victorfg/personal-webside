#!/usr/bin/env node
/**
 * Genera el sitemap leyendo contenido de TinaCMS (home.json).
 * No requiere next build ni Tina dev server.
 * Ejecutar: node scripts/generate-sitemap.js
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.vfernandez.me";

const formatTitleForUrl = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

const escapeXml = (str) => {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const routes = [
  { loc: "/", changefreq: "daily", priority: 1.0, lastmod: new Date().toISOString() },
  { loc: "/blog", changefreq: "daily", priority: 0.7, lastmod: new Date().toISOString() },
];

try {
  const homePath = path.join(process.cwd(), "content", "page", "home.json");
  const homeData = JSON.parse(fs.readFileSync(homePath, "utf-8"));
  const rows = homeData.rows || [];

  const allTags = new Set();
  for (const row of rows) {
    const slug = formatTitleForUrl(row.title);
    routes.push({
      loc: `/blog/${slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: row.date ? new Date(row.date).toISOString() : new Date().toISOString(),
    });
    (row.tags || []).forEach((t) => allTags.add(t));
  }

  // Tag pages (same URL format as Labels: encodeURIComponent)
  for (const tag of allTags) {
    routes.push({
      loc: `/tags/${encodeURIComponent(tag)}`,
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    });
  }
} catch (err) {
  console.warn("No se pudo leer home.json:", err.message);
}

// Generar sitemap-0.xml (urlset)
const urlsetXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>
    <loc>${escapeXml(SITE_URL + r.loc)}</loc>
    <lastmod>${r.lastmod.split("T")[0]}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

// Generar sitemap.xml (índice)
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
`;

const publicDir = path.join(process.cwd(), "public");
fs.writeFileSync(path.join(publicDir, "sitemap-0.xml"), urlsetXml);
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapIndexXml);

console.log("✓ Sitemap generado:");
console.log(`  - public/sitemap.xml (${routes.length} URLs)`);
console.log(`  - public/sitemap-0.xml`);
