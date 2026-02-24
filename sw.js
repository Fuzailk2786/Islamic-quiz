const CACHE_NAME = 'islamic-quest-v4'; // Incremented to v4 to force a fresh start
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Poppins:wght@300;400;600&display=swap',
  'https://img.icons8.com/fluency/192/mosque.png',
  'https://img.icons8.com/fluency/512/mosque.png'
];

// 1. Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Clears old data
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch Event: Network-First with Error Prevention
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // SAFETY CHECK: Only cache if the server says "OK" (Status 200)
        // If the server sends a 502, 504, or 404, we DON'T cache it.
        if (res && res.status === 200) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, resClone);
          });
        }
        return res;
      })
      .catch(() => {
        // If the network is totally down (Offline), show the cached version
        return caches.match(e.request);
      })
  );
});
