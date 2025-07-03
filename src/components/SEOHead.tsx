import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

function SEOHead({ 
  title = "Explore IT - Туры и Аренда Авто в Дубае | Экскурсии по ОАЭ",
  description = "Explore IT - ведущее туристическое агентство в Дубае. Экскурсии по ОАЭ, аренда премиальных автомобилей, пустынное сафари. Более 5000 довольных клиентов.",
  keywords = "туры дубай, экскурсии оаэ, аренда авто дубай, пустынное сафари, туристическое агентство дубай",
  image = "https://exploreit.ae/og-image.jpg",
  url = "https://exploreit.ae/",
  type = "website"
}: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default SEOHead;