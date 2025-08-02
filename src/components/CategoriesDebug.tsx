import React, { useState, useEffect } from 'react';
import { tourService } from '../services/tourService';

const CategoriesDebug: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const cats = await tourService.getCategories();
      setCategories(cats);
      console.log('Debug - All categories:', cats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Debug - Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Отладка категорий</h2>
      
      <div className="mb-4">
        <button 
          onClick={loadCategories}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Обновить
        </button>
      </div>

      {loading && <div className="text-blue-500">Загрузка...</div>}
      {error && <div className="text-red-500 mb-4">Ошибка: {error}</div>}

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Всего категорий: {categories.length}</h3>
      </div>

      <div className="space-y-2">
        {categories.map((cat, index) => (
          <div key={index} className="p-3 border rounded bg-gray-50">
            <div><strong>ID:</strong> {cat.id}</div>
            <div><strong>Label:</strong> {cat.label}</div>
            <div><strong>Icon:</strong> {cat.icon}</div>
            <div><strong>Index:</strong> {index}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-yellow-100 rounded">
        <h4 className="font-semibold mb-2">Проверка дубликатов:</h4>
        {(() => {
          const allCategories = categories.filter(cat => cat.id === 'all');
          const duplicates = categories.filter((cat, index) => 
            categories.findIndex(c => c.id === cat.id) !== index
          );
          
          return (
            <div>
              <div>Категорий "all": {allCategories.length}</div>
              <div>Всего дубликатов: {duplicates.length}</div>
              {duplicates.length > 0 && (
                <div className="mt-2">
                  <strong>Дубликаты:</strong>
                  <ul className="list-disc list-inside">
                    {duplicates.map((dup, index) => (
                      <li key={index}>{dup.id} - {dup.label}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default CategoriesDebug; 