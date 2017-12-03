
import reducer from './main';
import middleware from './middleware';
import {
    createStore,
    applyMiddleware
} from 'redux';
import {
    ACTION_GOTO_INDEX,
    ACTION_PAGING_OPTIONS
} from '../constants';

const store = createStore(reducer, applyMiddleware(middleware));

store.subscribe(function () {
    const state = store.getState();

    switch (state.lastPropertyChanged) {
        case 'quran':
            store.dispatch({
                type: ACTION_PAGING_OPTIONS
            });
            store.dispatch({
                type: ACTION_GOTO_INDEX,
                data: {
                    type: state.pageType,
                    index: state.pageIndex
                }
            });
            break;
        case 'pageType':
            store.dispatch({
                type: ACTION_PAGING_OPTIONS
            });
            store.dispatch({
                type: ACTION_GOTO_INDEX,
                data: {
                    type: state.pageType,
                    index: 1
                }
            });
    }
});

export default store;
