const CACHE_NAME = 'islamic-questz-v7';
const assets = ['./', 
    './index.html', 
    './questions.js', 
    './manifest.json','https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Poppins:wght@300;400;600&display=swap'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(assets)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
