import React from 'react';

interface CompanyStructuredDataProps {
  show?: boolean;
}

const CompanyStructuredData: React.FC<CompanyStructuredDataProps> = ({ show = true }) => {
  if (!show) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Explore IT Dubai",
    "alternateName": "Экскурсии в Дубае",
    "description": "Ведущее туристическое агентство в Дубае. Экскурсии по ОАЭ, аренда премиальных автомобилей, индивидуальные туры.",
    "url": "https://exploreitdubai.ru",
    "logo": "https://exploreitdubai.ru/logo.png",
    "image": "https://exploreitdubai.ru/pexels-pixabay-162031.webp",
    "telephone": "+79166508005",
    "email": "info@exploreitdubai.ru",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AE",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "streetAddress": "Dubai Marina",
      "postalCode": "00000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.2048,
      "longitude": 55.2708
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "5000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$",
    "currenciesAccepted": "AED, USD, EUR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Dubai"
      },
      {
        "@type": "City",
        "name": "Abu Dhabi"
      },
      {
        "@type": "City",
        "name": "Sharjah"
      },
      {
        "@type": "City",
        "name": "Fujairah"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Туристические услуги",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Экскурсии в Дубае",
            "description": "Экскурсии по достопримечательностям Дубая"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Аренда автомобилей",
            "description": "Аренда премиальных автомобилей в Дубае"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Аренда яхт",
            "description": "Аренда роскошных яхт в Дубае"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/exploreitdubai",
      "https://www.facebook.com/exploreitdubai",
      "https://t.me/exploreitdubai"
    ],
    "foundingDate": "2020",
    "numberOfEmployees": "10-50",
    "knowsAbout": [
      "Экскурсии в Дубае",
      "Туры по ОАЭ",
      "Аренда автомобилей",
      "Пустынное сафари",
      "Туристические услуги"
    ],
    "award": [
      "Лучшее туристическое агентство 2023",
      "Сертификат качества услуг"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default CompanyStructuredData; 