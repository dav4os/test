// SEO utilities

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export const generateMetaTags = (seoData: SEOData) => {
  const defaultTitle = 'Explore IT Dubai - Экскурсии и аренда авто в Дубае';
  const defaultDescription = 'Ведущее туристическое агентство в Дубае. Экскурсии по ОАЭ, аренда премиальных автомобилей, индивидуальные туры.';
  const defaultUrl = 'https://exploreitdubai.ru';
  const defaultImage = 'https://exploreitdubai.ru/pexels-pixabay-162031.webp';

  return [
    // Primary Meta Tags
    { name: 'title', content: seoData.title || defaultTitle },
    { name: 'description', content: seoData.description || defaultDescription },
    { name: 'keywords', content: seoData.keywords || 'экскурсии дубай, аренда авто дубай, туры оаэ, туристическое агентство дубай' },
    { name: 'author', content: seoData.author || 'Explore IT Dubai' },
    
    // Open Graph Meta Tags
    { property: 'og:title', content: seoData.title || defaultTitle },
    { property: 'og:description', content: seoData.description || defaultDescription },
    { property: 'og:type', content: seoData.type || 'website' },
    { property: 'og:url', content: seoData.url || defaultUrl },
    { property: 'og:image', content: seoData.image || defaultImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'Explore IT Dubai' },
    { property: 'og:locale', content: 'ru_RU' },
    
    // Twitter Meta Tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoData.title || defaultTitle },
    { name: 'twitter:description', content: seoData.description || defaultDescription },
    { name: 'twitter:image', content: seoData.image || defaultImage },
    { name: 'twitter:site', content: '@exploreitdubai' },
    { name: 'twitter:creator', content: '@exploreitdubai' },
    
    // Additional Meta Tags
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow' },
    { rel: 'canonical', href: seoData.url || defaultUrl }
  ];
};

export const generateStructuredData = (type: string, data: any) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    'url': data.url || 'https://exploreitdubai.ru',
    'name': data.name || 'Explore IT Dubai',
    'description': data.description || 'Ведущее туристическое агентство в Дубае'
  };

  switch (type) {
    case 'TravelAgency':
      return {
        ...baseData,
        'telephone': '+79166508005',
        'email': 'info@exploreitdubai.ru',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'AE',
          'addressLocality': 'Dubai',
          'addressRegion': 'Dubai',
          'streetAddress': 'Dubai Marina'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 25.2048,
          'longitude': 55.2708
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '5000',
          'bestRating': '5',
          'worstRating': '1'
        },
        'priceRange': '$$',
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '09:00',
          'closes': '18:00'
        }
      };
      
    case 'Article':
      return {
        ...baseData,
        'headline': data.title,
        'author': {
          '@type': 'Person',
          'name': data.author || 'Explore IT Dubai'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Explore IT Dubai',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://exploreitdubai.ru/logo.png'
          }
        },
        'datePublished': data.publishedTime,
        'dateModified': data.modifiedTime || data.publishedTime,
        'image': data.image,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': data.url
        }
      };
      
    default:
      return baseData;
  }
};

export const generateBreadcrumbData = (items: Array<{name: string, url: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://exploreitdubai.ru${item.url}`
    }))
  };
};

export const calculateSEOScore = (seoData: SEOData) => {
  let score = 0;
  const maxScore = 100;
  
  // Title (20 points)
  if (seoData.title) {
    const titleLength = seoData.title.length;
    if (titleLength >= 30 && titleLength <= 60) score += 20;
    else if (titleLength > 0) score += 10;
  }
  
  // Description (20 points)
  if (seoData.description) {
    const descLength = seoData.description.length;
    if (descLength >= 120 && descLength <= 160) score += 20;
    else if (descLength > 0) score += 10;
  }
  
  // Keywords (10 points)
  if (seoData.keywords) score += 10;
  
  // Image (10 points)
  if (seoData.image) score += 10;
  
  // URL (10 points)
  if (seoData.url) score += 10;
  
  // Type (10 points)
  if (seoData.type) score += 10;
  
  // Author (10 points)
  if (seoData.author) score += 10;
  
  // Published time (10 points)
  if (seoData.publishedTime) score += 10;
  
  return {
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
  };
};

// URL optimization
export const optimizeUrl = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Generate sitemap data
export const generateSitemapData = (pages: Array<{
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}>) => {
  return pages.map(page => ({
    url: page.url,
    lastModified: page.lastModified || new Date().toISOString().split('T')[0],
    changeFrequency: page.changeFrequency || 'weekly',
    priority: page.priority || 0.5
  }));
};