import { env } from '@/env';
import { MetadataRoute } from 'next';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : env.BASE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/'
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
