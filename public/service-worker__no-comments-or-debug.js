const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
const OFFLINE_PAGE_URL = '/offline.html';
const OFFLINE_RESOURCE_URLS = [
  OFFLINE_PAGE_URL,
  '/styles/styles.css',
  '/assets/favicon.ico',
  '/assets/favicon-32x32.png',
  '/assets/favicon-16x16.png',
  '/assets/android-chrome-192x192.png',
];

const OFFLINE_RESOURCE_REQUESTS = [];
for (const OFFLINE_RESOURCE_URL of OFFLINE_RESOURCE_URLS) {
  OFFLINE_RESOURCE_REQUESTS.push(new Request(OFFLINE_RESOURCE_URL, {cache: 'reload'}));
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(OFFLINE_RESOURCE_REQUESTS);
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
        return await fetch(event.request);
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(OFFLINE_PAGE_URL);
      }
    })());
  } else {
    let isCachedResource = false;
    for (const OFFLINE_RESOURCE_URL of OFFLINE_RESOURCE_URLS) {
      if (event.request.url.includes(OFFLINE_RESOURCE_URL)) {
        isCachedResource = true;
      }
    }
    if (isCachedResource) {
      event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(event.request.url);
      })());
    }
  }
});
