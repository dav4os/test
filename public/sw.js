// Service Worker для кэширования и оптимизации производительности
const CACHE_NAME = 'explore-it-cache-v1';
const STATIC_CACHE_NAME = 'explore-it-static-v1';
const IMAGE_CACHE_NAME = 'explore-it-images-v1';

// Ресурсы для предварительного кэширования
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Изображения для предварительного кэширования
const CRITICAL_IMAGES = [
  '/optimized/pexels-pixabay-162031.webp',
  '/optimized/pexels-apasaric-2044434.webp',
  '/optimized/pexels-bubi-2867769.webp'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Кэшируем статические ресурсы
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('📦 Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      }),
      
      // Кэшируем критические изображения
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        console.log('🖼️ Caching critical images');
        return cache.addAll(CRITICAL_IMAGES);
      })
    ]).then(() => {
      console.log('✅ Service Worker: Installed successfully');
      return self.skipWaiting();
    })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Удаляем старые кэши
          if (cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE_NAME && 
              cacheName !== IMAGE_CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Пропускаем не-GET запросы
  if (request.method !== 'GET') {
    return;
  }
  
  // Стратегии кэширования в зависимости от типа ресурса
  if (url.pathname.endsWith('.webp') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.png')) {
    // Стратегия Cache First для изображений
    event.respondWith(cacheFirst(request, IMAGE_CACHE_NAME));
  } else if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    // Стратегия Stale While Revalidate для JS/CSS
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE_NAME));
  } else if (url.pathname.startsWith('/api/')) {
    // Стратегия Network First для API
    event.respondWith(networkFirst(request));
  } else {
    // Стратегия Cache First для остальных ресурсов
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  }
});

// Стратегия Cache First
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Cache First failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Стратегия Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    const fetchPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(cacheName);
        cache.then((cache) => cache.put(request, networkResponse.clone()));
      }
      return networkResponse;
    });
    
    return cachedResponse || fetchPromise;
  } catch (error) {
    console.warn('Stale While Revalidate failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Стратегия Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Network First failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline content not available', { status: 503 });
  }
}

// Обработка сообщений от основного потока
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    caches.keys().then((cacheNames) => {
      event.ports[0].postMessage({ cacheNames });
    });
  }
});

// Периодическая очистка старых кэшей
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cleanup-cache') {
    event.waitUntil(cleanupOldCaches());
  }
});

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    name.startsWith('explore-it-') && 
    name !== CACHE_NAME && 
    name !== STATIC_CACHE_NAME && 
    name !== IMAGE_CACHE_NAME
  );
  
  return Promise.all(
    oldCaches.map(cacheName => {
      console.log('🧹 Cleaning up old cache:', cacheName);
      return caches.delete(cacheName);
    })
  );
} 