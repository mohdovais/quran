import {
    TYPE_PAGE,
    TYPE_SURA
} from './constants';
import reducerSura from './reducers/sura';
import reducerPage from './reducers/page';

const initialState = {
    type: TYPE_SURA,
    types: [{
        text: 'Sura',
        value: TYPE_SURA
    }, {
        text: 'Page',
        value: TYPE_PAGE
    }],
    index: 1,
    verse: [],
    pages: [],
    maxPage: 0,
    quran: [],
    meta: {
        pages: {
            page: []
        },
        suras: {
            sura: []
        }
    }
}

function applyState(state, data) {
    return Object.assign({}, state, {
        meta: data.meta || {},
        quran: data.quran || []
    });
}

function gotoIndex(state, action) {
    const type = action.data && action.data.type || state.type;
    switch (type) {
        case TYPE_PAGE:
            return reducerPage(state, action);
        case TYPE_SURA:
            return reducerSura(state, action);
        default:
            return state;
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD':
            state = applyState(state, action.data);
            action = {
                data: {
                    index: state.index,
                    type: state.type
                }
            }
        case 'CHANGE_TYPE':
        case 'GOTO_INDEX':
            return gotoIndex(state, action);
        default:
            return state;
    }
}
