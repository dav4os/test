import React from 'react';
import SEOHead from './SEOHead';

function TestSEO() {
  return (
    <>
      <SEOHead 
        title="ТЕСТ SEO - Explore IT"
        description="Это тестовая страница для проверки работы SEOHead"
        keywords="тест, seo, explore it"
        url="https://exploreitdubai.ru/test"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Тест SEOHead
          </h1>
          <p className="text-xl text-gray-600">
            Проверьте заголовок страницы в браузере
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Должно быть: "ТЕСТ SEO - Explore IT"
          </p>
        </div>
      </div>
    </>
  );
}

export default TestSEO; 