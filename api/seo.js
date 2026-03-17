import { createClient } from "@sanity/client";

// Sanity client for fetching product data at runtime
const client = createClient({
  projectId: "rv6k790j",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-13",
});

export default async function handler(req, res) {
  const { path } = req.query;
  const baseUrl = `https://${req.headers.host}`;

  // Default SEO setup
  let seo = {
    title: "Gifting Tree | Premium Handmade & Customized Resin Products",
    description: "Discover premium handcrafted resin products, customized gifts, wedding accessories, bookmarks, and beautiful art pieces at Gifting Tree.",
    image: `${baseUrl}/og-preview.png`,
    url: `${baseUrl}${path}`,
  };

  // 1. Fetch data for specific routes
  if (path.startsWith('/product/')) {
    const slug = path.split('/product/')[1];
    try {
      const product = await client.fetch('*[_type == "product" && slug.current == $slug][0]', { slug });
      if (product) {
        // Build product specific SEO
        // This is where we fetch the real image from Sanity URL builder
        // For simplicity, we'll use a direct image URL or a fixed format
        // Sanity images: https://cdn.sanity.io/images/rv6k790j/production/ASSET_ID-DIMENSIONS.jpg
        let imageUrl = `${baseUrl}/og-preview.png`;
        if (product.frontImage?.asset?._ref) {
          const ref = product.frontImage.asset._ref;
          // Format: image-ID-DIMENSIONS-EXT
          const id = ref.split('-')[1];
          const dims = ref.split('-')[2];
          const ext = ref.split('-')[3];
          imageUrl = `https://cdn.sanity.io/images/rv6k790j/production/${id}-${dims}.${ext}?w=1200&h=630&fit=crop&q=90`;
        }
        
        seo = {
          title: `${product.name} | Gifting Tree`,
          description: product.description || seo.description,
          image: imageUrl,
          url: `${baseUrl}${path}`,
        };
      }
    } catch (err) {
      console.error("Sanity fetch failed:", err);
    }
  } else if (path === '/resin-products') {
    seo.title = "Premium Resin Masterpieces & Gallery | Gifting Tree";
    seo.image = `${baseUrl}/og-preview-resin-products.png`;
  } else if (path === '/festival') {
    seo.title = "The Exclusive Festive Collection | Gifting Tree";
  }

  // 2. Return the HTML with injected meta tags
  // We'll proxy the original index.html from our origin and replace tags
  // This is how Netlify/Vercel "edge" SEO works for SPA
  try {
    const response = await fetch(baseUrl);
    let html = await response.text();

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${seo.title}</title>`);
    
    // Helper to replace tags robustly (handles different attribute orders)
    const replaceTag = (html, tagPattern, replacement) => {
      const regex = new RegExp(tagPattern, "si");
      return html.replace(regex, replacement);
    };

    // 2. Replace Description tags
    html = replaceTag(html, '<meta[^>]*?name="description"[^>]*?>', `<meta name="description" content="${seo.description}" />`);
    html = replaceTag(html, '<meta[^>]*?property="og:description"[^>]*?>', `<meta property="og:description" content="${seo.description}" />`);
    html = replaceTag(html, '<meta[^>]*?name="twitter:description"[^>]*?>', `<meta name="twitter:description" content="${seo.description}" />`);

    // 3. Replace Title Meta tags
    html = replaceTag(html, '<meta[^>]*?property="og:title"[^>]*?>', `<meta property="og:title" content="${seo.title}" />`);
    html = replaceTag(html, '<meta[^>]*?name="twitter:title"[^>]*?>', `<meta name="twitter:title" content="${seo.title}" />`);

    // 4. Replace Image Meta tags
    html = replaceTag(html, '<meta[^>]*?property="og:image"[^>]*?>', `<meta property="og:image" content="${seo.image}" />`);
    html = replaceTag(html, '<meta[^>]*?name="twitter:image"[^>]*?>', `<meta name="twitter:image" content="${seo.image}" />`);

    // 5. Replace URL
    html = replaceTag(html, '<meta[^>]*?property="og:url"[^>]*?>', `<meta property="og:url" content="${seo.url}" />`);
    html = replaceTag(html, '<link[^>]*?rel="canonical"[^>]*?>', `<link rel="canonical" href="${seo.url}" />`);

    // Set Cache Headers to dramatically improve bot response time
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

    // Set Response as HTML
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);

  } catch (error) {
    console.error("HTML fetch failed:", error);
    res.status(500).send("Server Error");
  }
}
