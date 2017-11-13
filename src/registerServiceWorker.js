

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        "use strict"
        navigator.serviceWorker
        .getRegistration()
        .then(function (registration) {
            if (registration && registration.active) {
                //registration.unregister()
            }

            if (!registration || !navigator.serviceWorker.controller) {
                navigator.serviceWorker
                    .register('service-worker.js')
                    .then(function () {
                        window.location.reload();
                    });
            } else {
                init();
            }
        });
    });
} else {
    init();
}
