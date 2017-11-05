import {
    TYPE_PAGE,
    TYPE_SURA,
    ACTION_CHANGE_TYPE,
    ACTION_GOTO_INDEX
} from './constants';
import reducerSura from './reducers/sura';
import reducerPage from './reducers/page';
import capitalize from './utils/capitalize';
import getObjectProperty from './utils/getObjectProperty';

const initialState = {
    source: {
        quran: [],
        meta: {}
    },
    dispalyTypes: [{
        text: capitalize(TYPE_SURA),
        value: TYPE_SURA
    }, {
        text: capitalize(TYPE_PAGE),
        value: TYPE_PAGE
    }],
    display: {
        index: 1,
        type: TYPE_SURA,
        typeOptions: [],
        chapters: []
    }
}

function applySourceData(state, data) {
    return Object.assign({}, state, {
        source: {
            meta: data.meta || {},
            quran: data.quran || []
        }
    });
}

function gotoIndex(state, action) {
    const type = getObjectProperty(action, 'data.type') || getObjectProperty(state, 'display.type');
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
    const display = state.display;
    switch (action.type) {
        case 'LOAD':
            state = applySourceData(state, action.data);
            action = {
                data: {
                    index: display.index,
                    type: display.type
                }
            }
        case ACTION_CHANGE_TYPE:
        case ACTION_GOTO_INDEX:
            return gotoIndex(state, action);
        default:
            return state;
    }
}
