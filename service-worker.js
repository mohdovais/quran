var CACHE_NAME = 'cache-quran-v1.0.3';
var urlsToCache = [
  'index.html',
  'assets/scripts/app.min.js',
  'assets/scripts/web-worker.min.js',
  'assets/data/quran-data.xml',
  'assets/data/quran-simple.xml'
];
// INSTALL
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// FETCH
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      }
    )
  );
});
