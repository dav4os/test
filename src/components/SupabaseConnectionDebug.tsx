import React, { useState, useEffect } from 'react';
import { testSupabaseConnection, getSupabaseInfo } from '../utils/supabase';
import { tourService } from '../services/tourService';

const SupabaseConnectionDebug: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Проверка...');
  const [connectionTest, setConnectionTest] = useState<boolean | null>(null);
  const [toursTest, setToursTest] = useState<string>('Не тестировалось');
  const [supabaseInfo, setSupabaseInfo] = useState<any>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const info = getSupabaseInfo();
        setSupabaseInfo(info);

        if (!info.isConfigured) {
          setConnectionStatus('❌ Supabase не настроен');
          setConnectionTest(false);
          return;
        }

        setConnectionStatus('🔄 Тестирование подключения...');
        const isConnected = await testSupabaseConnection();
        setConnectionTest(isConnected);
        setConnectionStatus(isConnected ? '✅ Подключение успешно' : '❌ Ошибка подключения');

        // Тестируем загрузку туров
        if (isConnected) {
          setToursTest('🔄 Тестирование загрузки туров...');
          try {
            const response = await tourService.getTours();
            setToursTest(`✅ Туры загружены: ${response.tours.length} из ${response.total}`);
          } catch (error) {
            setToursTest(`❌ Ошибка загрузки туров: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
          }
        }
      } catch (error) {
        setConnectionStatus(`❌ Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
        setConnectionTest(false);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Отладка подключения к Supabase</h2>
      
      <div className="space-y-6">
        {/* Информация о конфигурации */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Конфигурация</h3>
          <div className="space-y-2 text-sm">
            <div><strong>URL настроен:</strong> {supabaseInfo?.url ? '✅' : '❌'}</div>
            <div><strong>Ключ настроен:</strong> {supabaseInfo?.hasKey ? '✅' : '❌'}</div>
            <div><strong>Длина ключа:</strong> {supabaseInfo?.keyLength || 0} символов</div>
            <div><strong>Полная конфигурация:</strong> {supabaseInfo?.isConfigured ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* Статус подключения */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Подключение к базе данных</h3>
          <div className="space-y-2">
            <div><strong>Статус:</strong> {connectionStatus}</div>
            <div><strong>Тест подключения:</strong> {connectionTest === null ? '⏳' : connectionTest ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* Тест загрузки туров */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Тест загрузки туров</h3>
          <div><strong>Результат:</strong> {toursTest}</div>
        </div>

        {/* Переменные окружения */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Переменные окружения</h3>
          <div className="space-y-2 text-sm">
            <div><strong>VITE_SUPABASE_URL:</strong> {import.meta.env.VITE_SUPABASE_URL || '❌ Не настроено'}</div>
            <div><strong>VITE_SUPABASE_ANON_KEY:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Настроено' : '❌ Не настроено'}</div>
          </div>
        </div>

        {/* Инструкции */}
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold mb-3 text-amber-800">Инструкции по настройке</h3>
          <div className="space-y-2 text-sm text-amber-700">
            <div>1. Создайте файл <code className="bg-amber-100 px-1 rounded">.env</code> в корне проекта</div>
            <div>2. Добавьте переменные:</div>
            <pre className="bg-amber-100 p-2 rounded text-xs overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`}
            </pre>
            <div>3. Получите данные из Supabase Dashboard → Settings → API</div>
            <div>4. Перезапустите сервер разработки</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseConnectionDebug; 