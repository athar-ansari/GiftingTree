import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "rv6k790j",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-13",
});

export default async function handler(req, res) {
  const baseUrl = `https://${req.headers.host}`;
  const today = new Date().toISOString().split('T')[0];

  try {
    // Fetch all product slugs from Sanity
    const products = await client.fetch('*[_type == "product"] { "slug": slug.current }');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/resin-products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/festival</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Dynamic Product Pages -->
  ${products.map(p => `
  <url>
    <loc>${baseUrl}/product/${p.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (err) {
    console.error("Sitemap generation failed:", err);
    res.status(500).send("Error generating sitemap");
  }
}
