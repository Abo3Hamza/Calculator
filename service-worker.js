const CACHE_NAME = 'calculator-pwa-v1';
const urlsToCache = [
  '/Calculator/',
  '/Calculator/index.html',
  '/Calculator/manifest.json',
  '/Calculator/service-worker.js',
  '/Calculator/icons/icon-192.png',
  '/Calculator/icons/icon-512.png'
  // ضع هنا أي ملفات أخرى تستخدمها لو في
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});