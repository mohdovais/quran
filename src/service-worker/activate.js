export default function (event) {
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
