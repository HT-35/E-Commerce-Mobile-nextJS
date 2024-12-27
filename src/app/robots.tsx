import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // không cho search engine truy cập page /me
    },
    sitemap: 'https://htsstore.io.vn/sitemap.xml',
  };
}
