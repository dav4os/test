import { useState, useEffect, useCallback } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isInstalled: boolean;
  isUpdated: boolean;
  error: string | null;
}

export const useServiceWorker = () => {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isInstalled: false,
    isUpdated: false,
    error: null
  });

  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Регистрация Service Worker
  const registerServiceWorker = useCallback(async () => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: 'Service Worker не поддерживается' }));
      return;
    }

    try {
      const swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      setRegistration(swRegistration);
      setState(prev => ({ ...prev, isRegistered: true }));

      // Обработка обновлений Service Worker
      swRegistration.addEventListener('updatefound', () => {
        const newWorker = swRegistration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setState(prev => ({ ...prev, isUpdated: true }));
            }
          });
        }
      });

      // Обработка активации
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setState(prev => ({ ...prev, isInstalled: true }));
      });

    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: `Ошибка регистрации Service Worker: ${error}` 
      }));
    }
  }, [state.isSupported]);

  // Обновление Service Worker
  const updateServiceWorker = useCallback(() => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [registration]);

  // Получение информации о кэше
  const getCacheInfo = useCallback(async () => {
    if (!registration) return null;

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      };

      registration.active?.postMessage(
        { type: 'GET_CACHE_INFO' },
        [messageChannel.port2]
      );
    });
  }, [registration]);

  // Очистка кэша
  const clearCache = useCallback(async () => {
    if (!registration) return;

    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
  }, [registration]);

  // Автоматическая регистрация при загрузке
  useEffect(() => {
    if (state.isSupported && !state.isRegistered) {
      registerServiceWorker();
    }
  }, [state.isSupported, state.isRegistered, registerServiceWorker]);

  return {
    ...state,
    registration,
    registerServiceWorker,
    updateServiceWorker,
    getCacheInfo,
    clearCache
  };
};

export default useServiceWorker; 