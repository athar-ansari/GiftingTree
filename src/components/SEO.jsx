import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  keywords,
  author = 'Gifting Tree'
}) => {
  const siteTitle = 'Gifting Tree | Premium Handcrafted Resin Art & Unique Gifts';
  const defaultDescription = 'Discover premium handcrafted resin products, customized gifts, and beautiful art pieces at Gifting Tree. Shop unique, high-quality artisanal gifts for every special occasion.';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://giftingtree.vercel.app';
  // Using og-preview.png as the default personal image if no image is provided
  const defaultImage = `${siteUrl}/og-preview.png`;

  const metaTitle = title ? `${title} | Gifting Tree` : siteTitle;
  const metaDescription = description || defaultDescription;
  
  // Ensure the image URL is absolute
  let metaImage = image || defaultImage;
  if (metaImage && metaImage.startsWith('/')) {
    metaImage = `${siteUrl}${metaImage}`;
  }
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <>
      <Helmet>
        {/* Base SEO Meta Tags */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="author" content={author} />
        <link rel="canonical" href={metaUrl} />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:site_name" content="Gifting Tree" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />

        {/* Structured Data (JSON-LD) for Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === 'product' ? 'Product' : 'WebSite',
            "name": metaTitle,
            "description": metaDescription,
            "url": metaUrl,
            "image": metaImage,
            "publisher": {
              "@type": "Organization",
              "name": "Gifting Tree",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/android-chrome-512x512.png`
              }
            }
          })}
        </script>
      </Helmet>
    </>
  );
};

export default SEO;
