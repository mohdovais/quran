import {
    TYPE_PAGE,
    TYPE_SURA,
    ACTION_APPLY
} from '../constants';
import capitalize from '../utils/capitalize';

const initialState = {
    lastPropertyChanged: null,
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
    pagingOptions: [],
    pageType: TYPE_SURA,
    pageIndex: 1,
    pageChapters: []
}

export default function reducer(state = initialState, action) {
    if(action.type === ACTION_APPLY){
        state = Object.assign({}, state, action.data);
    }
    return state;
}
