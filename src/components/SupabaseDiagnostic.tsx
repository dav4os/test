import React, { useEffect, useState } from 'react';
import { supabase, getSupabaseInfo } from '../utils/supabase';

interface DiagnosticResult {
  step: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  details?: any;
}

export default function SupabaseDiagnostic() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    const diagnostics: DiagnosticResult[] = [];

    // Шаг 1: Проверка переменных окружения
    const info = getSupabaseInfo();
    diagnostics.push({
      step: 'Проверка переменных окружения',
      status: info.isConfigured ? 'success' : 'error',
      message: info.isConfigured 
        ? '✅ Все переменные настроены правильно' 
        : '❌ Переменные не настроены',
      details: info
    });

    // Шаг 2: Проверка клиента Supabase
    if (supabase) {
      diagnostics.push({
        step: 'Создание клиента Supabase',
        status: 'success',
        message: '✅ Клиент Supabase создан успешно'
      });
    } else {
      diagnostics.push({
        step: 'Создание клиента Supabase',
        status: 'error',
        message: '❌ Не удалось создать клиент Supabase'
      });
      setResults(diagnostics);
      setLoading(false);
      return;
    }

    // Шаг 3: Проверка подключения к Supabase
    try {
      const { data, error } = await supabase.from('blog_articles').select('count').limit(1);
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Таблица не существует
          diagnostics.push({
            step: 'Подключение к Supabase',
            status: 'success',
            message: '✅ Подключение к Supabase успешно, но таблица blog_articles не существует'
          });
        } else {
          diagnostics.push({
            step: 'Подключение к Supabase',
            status: 'error',
            message: `❌ Ошибка подключения: ${error.message}`,
            details: error
          });
        }
      } else {
        diagnostics.push({
          step: 'Подключение к Supabase',
          status: 'success',
          message: '✅ Подключение к Supabase успешно'
        });
      }
    } catch (error) {
      diagnostics.push({
        step: 'Подключение к Supabase',
        status: 'error',
        message: `❌ Критическая ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        details: error
      });
    }

    // Шаг 4: Проверка CORS
    try {
      const response = await fetch(`${info.url}/rest/v1/`, {
        method: 'GET',
        headers: {
          'apikey': info.hasKey ? 'test' : '',
          'Authorization': info.hasKey ? 'Bearer test' : ''
        }
      });
      
      if (response.status === 401) {
        diagnostics.push({
          step: 'Проверка CORS',
          status: 'success',
          message: '✅ CORS настроен правильно (получен ответ 401 - ожидаемо для тестового запроса)'
        });
      } else {
        diagnostics.push({
          step: 'Проверка CORS',
          status: 'success',
          message: `✅ CORS работает (статус: ${response.status})`
        });
      }
    } catch (error) {
      diagnostics.push({
        step: 'Проверка CORS',
        status: 'error',
        message: `❌ Проблема с CORS: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        details: error
      });
    }

    setResults(diagnostics);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-center text-gray-600">Выполняется диагностика...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Диагностика Supabase</h1>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{result.step}</h3>
                    <div className={`mt-2 p-3 rounded-lg ${
                      result.status === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : result.status === 'error'
                        ? 'bg-red-50 border border-red-200 text-red-800'
                        : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                    }`}>
                      <div className="flex items-center">
                        <span className="text-lg mr-2">
                          {result.status === 'success' ? '✅' : result.status === 'error' ? '❌' : '⏳'}
                        </span>
                        <span>{result.message}</span>
                      </div>
                    </div>
                    
                    {result.details && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">Детали:</h4>
                        <pre className="text-sm text-gray-600 overflow-x-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Рекомендации</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Если таблицы не существуют - создайте их в Supabase Dashboard</li>
              <li>• Если есть CORS ошибки - проверьте настройки в Supabase Dashboard</li>
              <li>• Если есть проблемы с API ключом - проверьте правильность ключа</li>
              <li>• После создания таблиц настройте RLS политики</li>
            </ul>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Повторить диагностику
            </button>
            <button
              onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Открыть Supabase Dashboard
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