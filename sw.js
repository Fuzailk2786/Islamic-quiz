const CACHE_NAME = 'islamic-quest-v2'; // Increment this version (v1 to v2) when you update your game
const assets = [
  './',
  './index.html',
  './manifest.json', // Added manifest to cache
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Poppins:wght@300;400;600&display=swap',
  'https://img.icons8.com/fluency/192/mosque.png', // Cache your icons so they show up offline
  'https://img.icons8.com/fluency/512/mosque.png'
];

// 1. Install Event: Saves assets into the browser storage
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching Shell Assets');
      return cache.addAll(assets);
    })
  );
});

// 2. Activate Event: Deletes OLD caches (Crucial for when you update levels)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event: Serve from cache, then try network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => {
          // Optional: You could return a custom offline page here
      });
    })
  );
});
