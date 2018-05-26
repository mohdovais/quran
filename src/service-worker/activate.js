export default function (event) {
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
            console.log(error)
        })
    );
    return self.clients.claim();
}
