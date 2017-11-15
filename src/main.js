import '../assets/styles/style.css';
import './polyfills/object-assign';
import FakePromise from 'promise-polyfill';
import ajax from './utils/ajax';
import xml2json from './utils/xml2json';
import {
    h,
    render
} from 'preact';
import App from './components/app';
import Router from './router';
import googleFonts from './googlefonts';
import {
    ACTION_LOAD,
    ACTION_GOTO_INDEX
} from './constants';
import store from './reducers/store';

if (!window.Promise) {
   window.Promise = FakePromise;
}

const doc = document;


const app = render(h(App, {
    store: store
}), doc.body, doc.getElementById('app'));

/* *********************************************
 * Router Config Start
 * ******************************************* */

const router = new Router({
    '(sura|page)\/(\\d+)': function (type, _index) {
        const index = parseInt(_index, 10);
        const state = store.getState();
        if (index && index > 0) {
            if (!(
                    state.pageIndex === index &&
                    state.pageType === type
                )) {
                store.dispatch({
                    type: ACTION_GOTO_INDEX,
                    data: {
                        type,
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
    router.redirectTo(`${state.pageType}/${state.pageIndex}`);
});

/* *********************************************
 * Router End
 * ******************************************* */

function hidePreloader() {
    app.removeAttribute('hidden');
    doc.querySelector('.loader').setAttribute('hidden', true);
}

function init() {
    Promise.all([
        ajax('assets/data/quran-simple.xml').then(xhr => xml2json(xhr.responseXML)),
        ajax('assets/data/quran-data.xml').then(xhr => xml2json(xhr.responseXML))
    ]).then(function (responses) {
        store.dispatch({
            type: ACTION_LOAD,
            data: {
                quran: responses[0].quran.sura,
                meta: responses[1].quran
            }
        });

        hidePreloader();

    }, function (e) {
        console.log(e)
    });
}

init();

// attach Google fonts css
googleFonts('Amiri');
