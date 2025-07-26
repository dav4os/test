// Sitemap generator utility

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  urls: SitemapUrl[];
  includeImportantFiles?: boolean;
}

export const generateSitemapXML = (config: SitemapConfig): string => {
  const { baseUrl, urls, includeImportantFiles = true } = config;
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add main URLs
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${url.loc}</loc>\n`;
    if (url.lastmod) {
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    if (url.changefreq) {
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    }
    if (url.priority !== undefined) {
      xml += `    <priority>${url.priority}</priority>\n`;
    }
    xml += '  </url>\n';
  });
  
  // Add important files if requested
  if (includeImportantFiles) {
    const importantFiles = [
      { loc: '/sitemap.xml', changefreq: 'weekly' as const, priority: 0.3 },
      { loc: '/robots.txt', changefreq: 'monthly' as const, priority: 0.1 },
      { loc: '/manifest.json', changefreq: 'monthly' as const, priority: 0.1 }
    ];
    
    importantFiles.forEach(file => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${file.loc}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${file.changefreq}</changefreq>\n`;
      xml += `    <priority>${file.priority}</priority>\n`;
      xml += '  </url>\n';
    });
  }
  
  xml += '</urlset>';
  return xml;
};

// Default sitemap configuration for the site
export const getDefaultSitemapConfig = (): SitemapConfig => {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    baseUrl: 'https://exploreitdubai.ru',
    urls: [
      // Main pages
      {
        loc: '/',
        lastmod: today,
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: '/about',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: '/blog',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: '/rental',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.8
      },
      
      // Blog articles
      {
        loc: '/blog/top-10-mest-dubai-2024',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: '/blog/pustynnoe-safari-guide',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: '/blog/abu-dhabi-kulturnoe-nasledie',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: '/blog/luchshie-restorany-dubai-gastronomiya',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: '/blog/shopping-oae-rynki-mally',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: '/blog/vodnye-razvlecheniya-oae-plyazhi-diving',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      }
    ],
    includeImportantFiles: true
  };
};

// Function to generate sitemap for blog articles
export const generateBlogSitemap = (articles: Array<{slug: string, lastModified?: string}>) => {
  const today = new Date().toISOString().split('T')[0];
  
  return articles.map(article => ({
    loc: `/blog/${article.slug}`,
    lastmod: article.lastModified || today,
    changefreq: 'monthly' as const,
    priority: 0.7
  }));
};

// Function to validate sitemap URLs
export const validateSitemapUrls = (urls: SitemapUrl[]): {valid: boolean, errors: string[]} => {
  const errors: string[] = [];
  
  urls.forEach((url, index) => {
    if (!url.loc) {
      errors.push(`URL ${index + 1}: Missing location`);
    }
    
    if (url.priority !== undefined && (url.priority < 0 || url.priority > 1)) {
      errors.push(`URL ${index + 1}: Priority must be between 0 and 1`);
    }
    
    if (url.lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(url.lastmod)) {
      errors.push(`URL ${index + 1}: Invalid date format (use YYYY-MM-DD)`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Function to create sitemap index for multiple sitemaps
export const generateSitemapIndex = (sitemaps: Array<{loc: string, lastmod?: string}>): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${sitemap.loc}</loc>\n`;
    if (sitemap.lastmod) {
      xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
    }
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  return xml;
}; 