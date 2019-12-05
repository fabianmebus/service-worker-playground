
# Create an Offline Page with a Service Worker






* [site](https://service-worker-playgroun-152cd.web.app/) 

--- [index.html](public/index.html)

* SW is a proxy server

* many possibilities with SW many caching strategies [Service Worker Cookbook](https://serviceworke.rs/)

* we what an offline page ... so ... when we are offline















* have to be register by JS 

--- [main.js](public/scripts/main.js)

* once installed and activated all requests in scope go through the SW

* scope: default --> own location | down possible, up not possible



















* SW code in an own JS file

--- [service-worker.js](public/service-worker.js)

* SW have an own cache it is not: the HTTP cache, the application cache, local storage, indexedDB, etc. 

* in event fetch when event.respondWith the requests will be handled

--- [site](https://service-worker-playgroun-152cd.web.app/) 

* done!? ...


















* ... nope =(
















* know your browser and your dev tools!

* disable HTTP cache ... for development ... first ... but ... the user as the HTTP cache enabled =/



















* CSS is not cached ... '/styles/styles.css'

    await cache.addAll([OFFLINE_PAGE_URL, '/styles/styles.css']);
    return await cache.match(event.request) || cache.match(OFFLINE_PAGE_URL);

* the "waiting phase" =(




















* <p>new offline page content</p>





















* many more challenges, but ...  
* [service-worker__no-comments-or-debug.js](public/service-worker__done.js)







