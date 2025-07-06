// SEO optimization utilities

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

// Generate structured data for different content types
export const generateStructuredData = (type: string, data: any) => {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type
  };

  switch (type) {
    case 'TravelAgency':
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        url: data.url,
        telephone: data.telephone,
        email: data.email,
        address: data.address,
        sameAs: data.sameAs,
        aggregateRating: data.aggregateRating,
        priceRange: data.priceRange
      };

    case 'Article':
      return {
        ...baseStructure,
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          "@type": "Person",
          name: data.author
        },
        publisher: {
          "@type": "Organization",
          name: "Explore IT",
          logo: {
            "@type": "ImageObject",
            url: "https://exploreit.ae/logo.png"
          }
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url
        }
      };

    case 'TouristTrip':
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        image: data.image,
        offers: {
          "@type": "Offer",
          price: data.price,
          priceCurrency: "AED",
          availability: "https://schema.org/InStock"
        },
        provider: {
          "@type": "TravelAgency",
          name: "Explore IT"
        },
        touristType: data.touristType,
        itinerary: data.itinerary
      };

    default:
      return baseStructure;
  }
};

// Generate meta tags for different pages
export const generateMetaTags = (seoData: SEOData) => {
  return {
    title: seoData.title,
    meta: [
      { name: 'description', content: seoData.description },
      { name: 'keywords', content: seoData.keywords },
      { name: 'author', content: seoData.author || 'Explore IT' },
      
      // Open Graph
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { property: 'og:image', content: seoData.image || 'https://exploreit.ae/og-image.jpg' },
      { property: 'og:url', content: seoData.url || 'https://exploreit.ae' },
      { property: 'og:type', content: seoData.type || 'website' },
      { property: 'og:site_name', content: 'Explore IT' },
      { property: 'og:locale', content: 'ru_RU' },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoData.title },
      { name: 'twitter:description', content: seoData.description },
      { name: 'twitter:image', content: seoData.image || 'https://exploreit.ae/og-image.jpg' },
      
      // Additional SEO
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'theme-color', content: '#f59e0b' }
    ],
    link: [
      { rel: 'canonical', href: seoData.url || 'https://exploreit.ae' }
    ]
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// SEO score calculator
export const calculateSEOScore = (pageData: {
  title?: string;
  description?: string;
  keywords?: string;
  headings?: string[];
  images?: Array<{alt?: string}>;
  links?: Array<{text?: string}>;
  content?: string;
}) => {
  let score = 0;
  const issues: string[] = [];

  // Title check (25 points)
  if (pageData.title) {
    if (pageData.title.length >= 30 && pageData.title.length <= 60) {
      score += 25;
    } else {
      score += 10;
      issues.push(`Title length should be 30-60 characters (current: ${pageData.title.length})`);
    }
  } else {
    issues.push('Missing page title');
  }

  // Description check (25 points)
  if (pageData.description) {
    if (pageData.description.length >= 120 && pageData.description.length <= 160) {
      score += 25;
    } else {
      score += 10;
      issues.push(`Description length should be 120-160 characters (current: ${pageData.description.length})`);
    }
  } else {
    issues.push('Missing meta description');
  }

  // Keywords check (10 points)
  if (pageData.keywords && pageData.keywords.length > 0) {
    score += 10;
  } else {
    issues.push('Missing keywords');
  }

  // Headings check (15 points)
  if (pageData.headings && pageData.headings.length > 0) {
    score += 15;
  } else {
    issues.push('Missing headings structure');
  }

  // Images alt text check (15 points)
  if (pageData.images) {
    const imagesWithAlt = pageData.images.filter(img => img.alt && img.alt.length > 0);
    const altTextRatio = imagesWithAlt.length / pageData.images.length;
    score += Math.round(15 * altTextRatio);
    
    if (altTextRatio < 1) {
      issues.push(`${pageData.images.length - imagesWithAlt.length} images missing alt text`);
    }
  }

  // Content length check (10 points)
  if (pageData.content) {
    if (pageData.content.length >= 300) {
      score += 10;
    } else {
      score += 5;
      issues.push('Content is too short (should be at least 300 characters)');
    }
  } else {
    issues.push('Missing content');
  }

  return {
    score: Math.min(score, 100),
    issues,
    rating: score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'fair' : 'poor'
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