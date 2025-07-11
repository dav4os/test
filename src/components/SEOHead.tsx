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
      
      {/* Yandex Webmaster Verification */}
      <meta name="yandex-verification" content="3bfd53dec64e6d62" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      
      {/* Force refresh meta tags */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
    </Helmet>
  );
}

export default SEOHead;