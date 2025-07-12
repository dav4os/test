import React from 'react';
import SEOHead from './SEOHead';

function TestSEO() {
  return (
    <>
      <SEOHead 
        title="🔥 ТЕСТ SEO МЕТА-ТЕГОВ - Explore IT | Проверка Динамических Тегов"
        description="🔥 Это специальная тестовая страница для проверки работы динамических SEO мета-тегов. Проверьте заголовок браузера и мета-теги в исходном коде."
        keywords="🔥 тест seo, динамические мета теги, проверка helmet, explore it тест"
        url="https://exploreitdubai.ru/test-seo"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔥 Тест SEOHead
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Проверьте заголовок страницы в браузере
          </p>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Ожидаемый заголовок:
            </h2>
            <p className="text-lg font-mono bg-gray-100 p-3 rounded">
              "🔥 ТЕСТ SEO МЕТА-ТЕГОВ - Explore IT | Проверка Динамических Тегов"
            </p>
            <div className="mt-6 text-sm text-gray-600">
              <p>✅ Если заголовок изменился - SEOHead работает!</p>
              <p>❌ Если заголовок не изменился - есть проблема с HelmetProvider</p>
            </div>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>Также проверьте мета-теги в исходном коде страницы (Ctrl+U)</p>
            <p>Должны быть обновлены: description, keywords, og:title, og:description</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestSEO; 