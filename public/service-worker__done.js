/* Many ideas here are based on: https://googlechrome.github.io/samples/service-worker/custom-offline-page/ */

/* Incrementing OFFLINE_VERSION (or any other change in this file) will kick off
the install event and force previously cached resources to be updated from the network. */
const OFFLINE_VERSION = 1;

const CACHE_NAME = 'offline';
/* The page to serve if offline. */
const OFFLINE_PAGE_URL = '/offline.html';
/* All resources needed for the offline page. */
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
  /* Setting {cache: 'reload'} in the new request will ensure that the response
  isn't fulfilled from the HTTP cache; i.e., it will be from the network. */
  OFFLINE_RESOURCE_REQUESTS.push(new Request(OFFLINE_RESOURCE_URL, {cache: 'reload'}));
}

self.addEventListener('install', (event) => {
  console.log('--- SW --- install event');
  /* Kick out the current active worker and activate the new one as soon as it enters the waiting phase
  See https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase */
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(OFFLINE_RESOURCE_REQUESTS);
  })());
});

self.addEventListener('activate', (event) => {
  console.log('--- SW --- activate event');
  event.waitUntil((async () => {
    /* Enable navigation preload if it's supported.
    See https://developers.google.com/web/updates/2017/02/navigation-preload */
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());
});

self.addEventListener('fetch', (event) => {
  console.log('--- SW --- fetch event');
  /* Ignore non-GET requests */
  if (event.request.method !== 'GET') {
    return;
  }
  console.log(`--- SW --- fetch url:  ${event.request.url} ------------------------------`);
  /* We only want to call event.respondWith() if this is a navigation request for an HTML page.
  All requests for an HTML page have to go through this service worker fetch handling to get the
  offline state, which is handled in the catch. */
  if (event.request.headers.get('Accept').includes('text/html')) {
    console.log('--- SW --- HTML fetch');
    event.respondWith((async () => {
      console.log('--- SW --- HTML fetch: service worker is handling this request');
      try {
        /* First, try to use the navigation preload response if it's supported. */
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          console.log(`--- SW --- HTML fetch: preload response for ${event.request.url}`);
          return preloadResponse;
        }
        console.log(`--- SW --- HTML fetch: network response for ${event.request.url}`);
        return await fetch(event.request);
      } catch (error) {
        /* Catch is only triggered if an exception is thrown, which is likely
        due to a network error.
        If fetch() returns a valid HTTP response with a response code in
        the 4xx or 5xx range, the catch() will NOT be called. */
        const cache = await caches.open(CACHE_NAME);
        console.log(`--- SW --- HTML fetch: cache response for ${event.request.url}`);
        return await cache.match(OFFLINE_PAGE_URL);
      }
    })());
  } else {
    console.log('--- SW --- none-HTML fetch');
    /* Check if the current request should have been cached. */
    let isCachedResource = false;
    for (const OFFLINE_RESOURCE_URL of OFFLINE_RESOURCE_URLS) {
      if (event.request.url.includes(OFFLINE_RESOURCE_URL)) {
        isCachedResource = true;
      }
    }
    if (isCachedResource) {
      event.respondWith((async () => {
        console.log('--- SW --- none-HTML fetch: service worker is handling this request');
        const cache = await caches.open(CACHE_NAME);
        console.log(`--- SW --- none-HTML fetch: cache response for ${event.request.url}`);
        return await cache.match(event.request.url);
      })());

    } else {
      // If our if() condition is false, then this fetch handler won't intercept the
      // request. If there are any other fetch handlers registered, they will get a
      // chance to call event.respondWith(). If no fetch handlers call
      // event.respondWith(), the request will be handled by the browser as if there
      // were no service worker involvement.
      console.log('--- SW --- none-HTML fetch: service worker is NOT handling this request');
    }
  }
});
