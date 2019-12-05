# Service Worker Playground

**CAUTION:** 
* This implementation is NOT extensively tested in major browsers or with many devices!
* The JS should be compiled to an older ES version to get a better browser support!   

---

Right now the Service Worker in [`service-worker.js`](./public/service-worker.js) has just **one** purpose:
 
**Serve a styled HTML (offline) page on any HTML request if the network connection isn’t working.**  

[Demo](https://service-worker-playgroun-152cd.web.app/)

## Tips for Service Worker Development

* There are a lot of possibilities, decide up front what do you want to accomplish with your SW. The [Service Worker Cookbook](https://serviceworke.rs/) is a good start for that.
* Know your browser (different manual reload options) and your browser dev tools.
* Have a basic understanding of HTTP caching, here you have [Caching best practices & max-age gotchas by Jake Archibald](https://jakearchibald.com/2016/caching-best-practices/).
* Switch off HTTP caching completely, for all (!) resources, with the HTTP header `Cache-Control: no-store` for instance.
* Set the **Preserve log** option for your JS console.
* Think about the scope, the SW should handel, have a look at [Register a service worker](https://developers.google.com/web/fundamentals/primers/service-workers#register_a_service_worker).
* A SW comes with a performance cost (bootup time) at first, see [Speed up Service Worker with Navigation Preloads](https://developers.google.com/web/updates/2017/02/navigation-preload).
* Be aware of the "waiting phase" for the installation of a new version of your SW, read [The Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase).
* Make sure that only the requests you need (as less as possible) are handled by your SW.
* Once your SW is installed and activated all requests in scope go through the SW.
* Make sure that only the resources you need (as less as possible) are cached by your SW.
* SWs have an own cache, it is not the HTTP cache, the application cache, local storage, indexedDB, etc. 
* Do not try to cache non-GET requests.
* Without an `FetchEvent.respondWith()` inside of a `fetch` event, the SW will not actually handel the request.
* HTML requests and non-HTML requests usually need different treatments.
* Use `cache: 'reload'` for the requests of the resources you want to cache to bypass the HTTP cache, like in `new Request('/offline.html', {cache: 'reload'})`.
* Do not forget to update your SW as soon as you updated cached resources.
* Start with a static cache name (e.g. "offline") which is not changed for every new SW installation.
* Switch on HTTP caching again and test your desired behaviour (again).

#### Resources

* https://googlechrome.github.io/samples/service-worker/custom-offline-page/
* https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase
* https://developers.google.com/web/fundamentals/primers/service-workers
* https://developers.google.com/web/fundamentals/codelabs/offline
* https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
* https://developers.google.com/web/updates/2017/02/navigation-preload
* https://jakearchibald.com/2016/caching-best-practices/
* https://adactio.com/ (has a very interesting Service Worker himself)
* https://serviceworke.rs/
* https://developer.mozilla.org/de/docs/Web/HTTP/Headers/Cache-Control
* https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine

## Playground
### Development

```bash
$ git clone https://github.com/fabianmebus/service-worker-playground.git
$ cd service-worker-playground
$ nvm use
$ npm install
``` 

### Deployment

#### With [Travis CI](https://travis-ci.org/)

Just push changes to the `master` branch.

#### Without [Travis CI](https://travis-ci.org/)

```bash
$ firebase login
$ firebase deploy
``` 
