'use strict';

const offlineUrl = '/offline-page.html';

addEventListener('install', event => {
  event.waitUntil(
    caches.open('offline-cache-1')
      .then(cache => {
        return cache.addAll([
          '/',
          offlineUrl,
        ]);
      })
  );
});

addEventListener('fetch', event => {
  // For HTML requests, try the network first, fall back to the cache, finally the offline page
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      new Promise(resolveWithResponse => {
        fetch(event.request)
          .then(responseFromFetch => {
            console.log('NETWORK');
            // NETWORK
            resolveWithResponse(responseFromFetch);
          })
          .catch(fetchError => {
            console.log('catch');
            console.error(fetchError);
            // CACHE or FALLBACK
            caches.match(event.request)
              .then(responseFromCache => {
                resolveWithResponse(responseFromCache || caches.match(offlineUrl));
              });
          });
      })
    )
  }
});
