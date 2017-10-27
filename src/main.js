import './polyfills/object-assign';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import {
    h,
    render
} from 'preact';
import {
    createStore
} from 'redux';
import fetchXML from './utils/fetchXML';
import {
    flattenSura,
    mergeMeta
} from './utils/utils';
import reducer from './reducer';
import App from './components/app';
import {
    ACTION_LOAD,
    ACTION_GOTO_INDEX,
    TYPE_SURA,
    TYPE_PAGE
} from './constants';
import '../assets/styles/style.css';
import Router from './router';

if (!window.Promise) {
    window.Promise = Promise;
}

const store = createStore(reducer);
const loader = document.querySelector('.loader');

/* *********************************************
 * Router Config Start
 * ******************************************* */

const router = new Router({
    '(sura|page)\/(\\d+)': function (type, _index) {
        const index = parseInt(_index, 10);
        if (index && index > 0) {
            let state = state = store.getState();
            if (!(state.index === index && state.type === type)) {
                store.dispatch({
                    type: ACTION_GOTO_INDEX,
                    data: {
                        type: type,
                        index
                    }
                });
            }
        } else {
            this.redirectTo(`${type}/1`);
        }
    },
    'sura\/(\\d+)\/aya\/(\\d+)': function (sura, aya) {
        console.log('callback', sura, aya, this)
    }
}).execute();

store.subscribe(function () {
    const state = store.getState();
    router.redirectTo(`${state.type}/${state.index}`)
});

/* *********************************************
 * Router End
 * ******************************************* */


const app = render(h(App, {
    store: store
}), document.body, document.getElementById('app'));

function hidePreloader() {
    app.removeAttribute('hidden');
    loader.setAttribute('hidden', true);
}

function init() {
    Promise.all([
        fetchXML('assets/data/quran-simple.xml'),
        fetchXML('assets/data/quran-data.xml')
    ]).then(function (responses) {
        const verse = flattenSura(responses[0].quran.sura);
        const meta = responses[1].quran;

        store.dispatch({
            type: ACTION_LOAD,
            data: {
                quran: mergeMeta(verse, meta),
                meta
            }
        });

        hidePreloader();

    }, function (e) {
        console.log(e)
    });
}

init();

/*

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

*/

// attach Google fonts css
(function (document, nodeType, existingNode, node) {
    existingNode = document.getElementsByTagName(nodeType)[0];
    node = document.createElement(nodeType);
    node.rel = 'stylesheet';
    node.href = 'https://fonts.googleapis.com/css?family=Amiri';
    node.type = 'text/css';
    existingNode.parentNode.insertBefore(node, existingNode);
}(document, 'link'));