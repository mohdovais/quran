function onInstall (event) {
    event.waitUntil(
        self.caches
        .open(self.CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(self.urlsToCache);
        })
        .then(() => {
            return self.skipWaiting();
        })
        .catch(error => {
            console.log(error);
        })
    );
}

function onActivate (event) {
    event.waitUntil(
        self.caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== self.CACHE_NAME) {
                        return self.caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.skipWaiting();
        })
        .catch(error => {
            console.log(error);
        })
    );
    return self.clients.claim();
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

self.CACHE_NAME = "1527363285310";

self.urlsToCache = [
  'index.html',
  'assets/scripts/app.min.js',
  'assets/scripts/web-worker.js',
  'assets/data/quran-simple.txt'
];

// INSTALL
self.addEventListener('install', onInstall.bind(self));

// ACTIVATE
self.addEventListener('activate', onActivate.bind(self));

// FETCH
self.addEventListener('fetch', onFetch.bind(self));
