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
                    serviceWorker.register(swjs)
                    .then(function () {
                        //console.log('then', sw)
                        //window.location.reload();
                        init();
                    }).catch(function(){
                        init();
                    });
                }).catch(function(){
                    init();
                });
        });
    } else {
        init();
    }

}
