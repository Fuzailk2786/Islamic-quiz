const CACHE_NAME = 'islamic-quest-v3'; // Incremented to v3 to force refresh
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Poppins:wght@300;400;600&display=swap',
  'https://img.icons8.com/fluency/192/mosque.png',
  'https://img.icons8.com/fluency/512/mosque.png'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Forces the new service worker to take over immediately
});

// Activate Event: Deletes old versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim(); // Immediately start controlling all open tabs
});

// Fetch Event: NETWORK-FIRST Strategy
// This ensures users see the live site if online, preventing "Bad Gateway" caching
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // If the network is working, save a copy to the cache
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(e.request)) // If network fails (offline), use cache
  );
});
