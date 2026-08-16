import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blinxlab.com';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/about',
    '/work',
    '/support',
    '/build',
    '/visibility',
    '/growth',
    '/systemize',
    '/scale',
    '/templates',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/work' ? 0.9 : 0.8,
  }));
}
