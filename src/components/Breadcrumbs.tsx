import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  // Structured Data для breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://exploreitdubai.ru${item.url}`
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumbs UI */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        <Link 
          to="/" 
          className="flex items-center hover:text-amber-500 transition-colors duration-200"
        >
          <Home size={16} className="mr-1" />
          Главная
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={item.url}>
            <ChevronRight size={16} className="text-gray-400" />
            {item.current ? (
              <span className="text-gray-800 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.url}
                className="hover:text-amber-500 transition-colors duration-200"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs; 