export default function (event) {
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
