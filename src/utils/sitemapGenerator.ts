// Sitemap Generator Utility

export interface SitemapItem {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  updatedAt?: string;
}

export const generateSitemapXML = (items: SitemapItem[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';
  
  const urlItems = items.map(item => {
    const lastmod = item.lastModified || new Date().toISOString().split('T')[0];
    const changefreq = item.changeFrequency || 'weekly';
    const priority = item.priority || 0.5;
    
    return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  
  return `${xmlHeader}
${urlsetOpen}
${urlItems}
${urlsetClose}`;
};

export const generateStaticSitemap = (): SitemapItem[] => {
  const baseUrl = 'https://exploreitdubai.ru';
  const today = new Date().toISOString().split('T')[0];
  
  return [
    // Главная страница
    {
      url: `${baseUrl}/`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    
    // Основные страницы
    {
      url: `${baseUrl}/tours`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/rental`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/yacht-rental`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    
    // Важные файлы
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/robots.txt`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.1
    },
    {
      url: `${baseUrl}/manifest.json`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.1
    }
  ];
};

export const generateBlogSitemap = (posts: BlogPost[]): SitemapItem[] => {
  const baseUrl = 'https://exploreitdubai.ru';
  
  return posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.7
  }));
};

export const generateToursSitemap = (tours: Tour[]): SitemapItem[] => {
  const baseUrl = 'https://exploreitdubai.ru';
  
  return tours.map(tour => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: tour.updatedAt || new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.8
  }));
};

export const generateFullSitemap = (
  staticPages: SitemapItem[] = [],
  blogPosts: BlogPost[] = [],
  tours: Tour[] = []
): string => {
  const allItems = [
    ...generateStaticSitemap(),
    ...generateBlogSitemap(blogPosts),
    ...generateToursSitemap(tours),
    ...staticPages
  ];
  
  return generateSitemapXML(allItems);
};

// Функция для сохранения sitemap в файл (для Node.js)
export const saveSitemapToFile = async (
  sitemapContent: string,
  filePath: string = 'public/sitemap.xml'
): Promise<void> => {
  if (typeof window === 'undefined') {
    // Node.js environment
    const fs = await import('fs/promises');
    await fs.writeFile(filePath, sitemapContent, 'utf-8');
  }
};

// Функция для отправки sitemap в поисковые системы
export const submitSitemapToSearchEngines = async (sitemapUrl: string): Promise<void> => {
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://blogs.yandex.ru/pings/?status=success&url=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];
  
  try {
    await Promise.allSettled(
      searchEngines.map(url => fetch(url))
    );
  } catch (error) {
    console.error('Error submitting sitemap:', error);
  }
}; 