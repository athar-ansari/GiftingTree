export default function middleware(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detect bots/crawlers
  const isBot = /bot|googlebot|crawler|spider|robot|crawling|facebookexternalhit|whatsapp|linkedinbot|twitterbot/i.test(userAgent);
  
  // Only intercept main routes for bots
  if (isBot && !url.pathname.includes('.') && 
     (url.pathname === '/' || url.pathname.startsWith('/product/') || url.pathname === '/resin-products' || url.pathname === '/festival')) {
    
    // Rewrite bot request to the server-side SEO API
    const rewriteUrl = new URL(request.url);
    rewriteUrl.pathname = '/api/seo';
    rewriteUrl.searchParams.set('path', url.pathname);
    
    return Response.rewrite(rewriteUrl);
  }

  return Response.next();
}

export const config = {
  matcher: ['/', '/product/:path*', '/resin-products', '/festival'],
};
