import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50 text-center px-4">
        <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Страница не найдена</h2>
        <p className="mb-6 text-gray-600">Возможно, вы ошиблись адресом или страница была удалена.</p>
        <Link to="/" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition">На главную</Link>
      </div>
    </>
  );
}

export default NotFoundPage; 