import React from 'react';

export default function EnvDebug() {
  const envVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_GOOGLE_SHEETS_URL: import.meta.env.VITE_GOOGLE_SHEETS_URL,
    VITE_CONTACT_PHONE: import.meta.env.VITE_CONTACT_PHONE,
    VITE_CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL,
    VITE_DEV_MODE: import.meta.env.VITE_DEV_MODE,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Отладка переменных окружения</h1>
          
          <div className="space-y-4">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{key}</h3>
                    <div className="mt-2">
                      {value ? (
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            Значение: <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                              {value.length > 50 ? `${value.substring(0, 50)}...` : value}
                            </span>
                          </div>
                          <div className="text-sm text-green-600">
                            ✅ Настроено ({value.length} символов)
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-red-600">
                          ❌ Не настроено
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Инструкции</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Убедитесь, что файл <code className="bg-blue-100 px-1 rounded">.env</code> находится в корне проекта</li>
              <li>• Все переменные должны начинаться с <code className="bg-blue-100 px-1 rounded">VITE_</code></li>
              <li>• Перезапустите сервер разработки после изменения .env</li>
              <li>• Проверьте консоль браузера на наличие ошибок</li>
            </ul>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Обновить страницу
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 