import React, { useEffect, useState } from 'react';
import { testSupabaseConnection, getSupabaseInfo } from '../utils/supabase';

export default function SupabaseTest() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const connected = await testSupabaseConnection();
        setIsConnected(connected);
        setInfo(getSupabaseInfo());
        
        if (!connected) {
          setError('Не удалось подключиться к Supabase. Проверьте настройки в файле .env');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-center text-gray-600">Тестирование подключения к Supabase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Тест подключения Supabase</h1>
          
          {/* Статус подключения */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Статус подключения</h2>
            <div className={`p-4 rounded-lg border ${
              isConnected 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center">
                <span className="text-2xl mr-2">
                  {isConnected ? '✅' : '❌'}
                </span>
                <span className="font-medium">
                  {isConnected ? 'Подключено к Supabase' : 'Ошибка подключения'}
                </span>
              </div>
            </div>
          </div>

          {/* Информация о конфигурации */}
          {info && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Конфигурация</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">URL:</span>
                  <span className="text-gray-600">
                    {info.url || '❌ Не настроен'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">API Ключ:</span>
                  <span className="text-gray-600">
                    {info.hasKey ? '✅ Настроен' : '❌ Не настроен'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Длина ключа:</span>
                  <span className="text-gray-600">{info.keyLength} символов</span>
                </div>
              </div>
            </div>
          )}

          {/* Ошибка */}
          {error && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-red-800">Ошибка</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Инструкции */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Следующие шаги</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>Создайте файл <code className="bg-blue-100 px-1 rounded">.env</code> в корне проекта</li>
                <li>Добавьте ваши Supabase URL и API ключ</li>
                <li>Создайте таблицы в Supabase Dashboard</li>
                <li>Настройте RLS политики</li>
                <li>Перезапустите сервер разработки</li>
              </ol>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Повторить тест
            </button>
            <button
              onClick={() => window.open('https://supabase.com', '_blank')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Открыть Supabase
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Назад
            </button>
          </div>

          {/* Дополнительная информация */}
          {isConnected && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ Подключение успешно!</h3>
              <p className="text-sm text-green-700">
                Теперь вы можете создавать сервисы для работы с базой данных и интегрировать их в ваше приложение.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 