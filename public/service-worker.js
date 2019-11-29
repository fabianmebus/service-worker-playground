const CACHE_NAME = 'offline';
const OFFLINE_PAGE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([OFFLINE_PAGE_URL]);
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      return await fetch(event.request);
    } catch (error) {
      const cache = await caches.open(CACHE_NAME);
      return await cache.match(OFFLINE_PAGE_URL);
    }
  })());
});
