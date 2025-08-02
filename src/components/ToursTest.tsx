import React, { useState, useEffect } from 'react';
import { useTours } from '../hooks/useTours';

const ToursTest: React.FC = () => {
  const { tours, loading, error, loadTours } = useTours();
  const [testResult, setTestResult] = useState<string>('Тестирование...');

  useEffect(() => {
    const testTours = async () => {
      try {
        setTestResult('🔄 Тестирование системы туров...');
        
        // Проверяем переменные окружения
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          setTestResult('❌ Переменные окружения не настроены');
          return;
        }

        setTestResult('✅ Переменные окружения настроены');
        
        // Ждем загрузки туров
        setTimeout(() => {
          if (loading) {
            setTestResult('⏳ Загрузка туров...');
          } else if (error) {
            setTestResult(`❌ Ошибка: ${error}`);
          } else {
            setTestResult(`✅ Туры загружены: ${tours.length} штук`);
          }
        }, 2000);

      } catch (error) {
        setTestResult(`❌ Ошибка тестирования: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
      }
    };

    testTours();
  }, [tours, loading, error]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Тест системы туров</h2>
      
      <div className="space-y-6">
        {/* Результат теста */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Результат теста</h3>
          <div className="text-lg">{testResult}</div>
        </div>

        {/* Переменные окружения */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Переменные окружения</h3>
          <div className="space-y-2 text-sm">
            <div><strong>VITE_SUPABASE_URL:</strong> {import.meta.env.VITE_SUPABASE_URL || '❌ Не настроено'}</div>
            <div><strong>VITE_SUPABASE_ANON_KEY:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Настроено' : '❌ Не настроено'}</div>
          </div>
        </div>

        {/* Состояние хука */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Состояние хука useTours</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Загрузка:</strong> {loading ? '🔄 Да' : '✅ Нет'}</div>
            <div><strong>Ошибка:</strong> {error || '✅ Нет'}</div>
            <div><strong>Количество туров:</strong> {tours.length}</div>
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Управление</h3>
          <div className="space-x-4">
            <button
              onClick={() => loadTours()}
              className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
            >
              Перезагрузить туры
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Обновить страницу
            </button>
          </div>
        </div>

        {/* Список туров */}
        {tours.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Загруженные туры</h3>
            <div className="space-y-2">
              {tours.map((tour) => (
                <div key={tour.id} className="p-2 bg-white rounded border">
                  <strong>{tour.title}</strong> - {tour.price}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursTest; 