export default function (event) {
    var me = this;
    event.waitUntil(
        me.caches
        .open(me.CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(me.urlsToCache);
        })
    );
}
