# Service Worker Playground

**CAUTION:** 
* This implementation is NOT extensively tested in major browsers or with many devices!
* The JS should be compiled to an older ES version to get a better browser support!   

---

Right now the Service Worker in `service-worker.js` has just **one** purpose:
 
**Serve a styled HTML (offline) page on any HTML request if the network connection isn’t working.**  

[Demo](https://service-worker-playgroun-152cd.web.app/)

## Tips for Service Worker Development

* There are a lot of caching strategies, decide up front what do you really want to accomplish. Have a look at the [Service Worker Cookbook](https://serviceworke.rs/).
* Know your browser (different manual reload options) and your browser dev tools.
* It definitely helps to have at least a basic understanding of HTTP caching, here you have [a good article from Jake Archibald](https://jakearchibald.com/2016/caching-best-practices/).
* Switch off HTTP caching completely, for all (!) resources, with the HTTP header `Cache-Control: no-store` for instance. 


* Switch on HTTP caching and test your desired behaviour (again)

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

## Development

```bash
$ git clone https://github.com/fabianmebus/service-worker-playground.git
$ cd service-worker-playground
$ nvm use
$ npm install
``` 

## Deployment

### With [Travis CI](https://travis-ci.org/)

Just push changes to the `master` branch.

### Without [Travis CI](https://travis-ci.org/)

```bash
$ firebase login
$ firebase deploy
``` 
