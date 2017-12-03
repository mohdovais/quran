import '../assets/styles/style.css';
import './polyfills/object-assign';
import './polyfills/array-find';
import FakePromise from 'promise-polyfill';
import ajax from './utils/ajax';
import {
    h,
    render
} from 'preact';
import App from './components/app';
import Router from './router';
import googleFonts from './google-fonts';
import {
    ACTION_LOAD,
    ACTION_GOTO_INDEX
} from './constants';
import store from './reducers/store';
import registerServiceWorker from './registerServiceWorker';
import parseQuran from './web-worker/prepare';
import observeStore from './reducers/observe-store';
import objectEquals from './utils/object/equals';

if (!window.Promise) {
   window.Promise = FakePromise;
}


const doc = document;

const app = render(h(App, {
    store: store
}), doc.body, doc.getElementById('app'));

registerServiceWorker('service-worker.js', function init() {
    ajax('assets/data/quran-simple.txt').then(function(xhr){
        store.dispatch({
            type: ACTION_LOAD,
            data: {
                quran: parseQuran(xhr.response)
            }
        });

        app.removeAttribute('hidden');
        doc.querySelector('.loader').setAttribute('hidden', true);

    }, function (e) {
        console.log(e)
    });
});


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
            router.redirectTo(`${type}/1`);
        }
    },
    'sura\/(\\d+)\/aya\/(\\d+)': function (sura, aya) {
        console.log('callback', sura, aya, this)
    }
}).execute();

observeStore(store, function(store, oldState){
    const storeState = store.getState();
    const newState = {
        pageIndex: storeState.pageIndex,
        pageType: storeState.pageType
    }
    return objectEquals(oldState, newState) ? oldState : newState;
}, function(state){
    router.redirectTo(`${state.pageType}/${state.pageIndex}`);
});

/* *********************************************
 * Router End
 * ******************************************* */


// attach Google fonts css
googleFonts('Amiri');
