export default function (swjs, init) {
    const serviceWorker = navigator.serviceWorker;
    init = init || function(){};

    if (serviceWorker) {
        window.addEventListener('load', function () {
            "use strict"
            serviceWorker
                .getRegistration()
                .then(function (registration) {
                    //if (registration && registration.active) {
                        //registration.unregister()
                    //}
                    if (!registration || !serviceWorker.controller) {
                        serviceWorker
                            .register(swjs)
                            .then(function (reg) {
                                window.location.reload();
                            }).catch(function(error){
                                init();
                            });
                    } else {
                        init();
                    }
                });
        });
    } else {
        init();
    }

}
