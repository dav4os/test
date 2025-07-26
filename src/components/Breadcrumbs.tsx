import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbData } from '../utils/seo';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const breadcrumbData = generateBreadcrumbData(items);

  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData, null, 2)
        }}
      />
      
      {/* Visual Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4" aria-label="Хлебные крошки">
        <Link 
          to="/" 
          className="flex items-center hover:text-amber-600 transition-colors"
          aria-label="Главная страница"
        >
          <Home size={16} />
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={16} className="text-gray-400" />
            {item.current ? (
              <span 
                className="text-amber-600 font-medium"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                to={item.url}
                className="hover:text-amber-600 transition-colors"
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