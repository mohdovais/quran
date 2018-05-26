function onInstall (event) {
    var me = this;
    event.waitUntil(
        me.caches
        .open(me.CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(me.urlsToCache);
        })
    );
}

function onActivate (event) {
    var me = this;
    event.waitUntil(
        me.caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== me.CACHE_NAME) {
                        return me.caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return me.clients.claim();
}

function onFetch (event) {
    var me = this;
    event.respondWith(
        me.caches.match(event.request)
        .then(function (response) {
            return response || me.fetch(event.request);
        })
    );
}

self.CACHE_NAME = "1527356640898";

self.urlsToCache = [
  'index.html',
  //'assets/scripts/app.min.js',
  //'assets/scripts/web-worker.min.js',
  'assets/data/quran-simple.txt'
];

// INSTALL
self.addEventListener('install', onInstall);

// ACTIVATE
self.addEventListener('activate', onActivate);

// FETCH
self.addEventListener('fetch', onFetch);
