import React from 'react';
import { generateStructuredData } from '../utils/seo';

interface StructuredDataProps {
  type: 'Article' | 'TravelAgency' | 'TouristTrip' | 'LocalBusiness';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = generateStructuredData(type, data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export default StructuredData; 