export default function (event) {
    var me = this;
    event.respondWith(
        me.caches.match(event.request)
        .then(function (response) {
            return response || me.fetch(event.request);
        })
    );
}
