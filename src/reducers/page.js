import {
    TYPE_PAGE,
    ACTION_LOAD
} from '../constants';

function getPages(count) {
    var pages = [];
    for (let i = 1; i <= count; i++) {
        pages.push({
            text: i,
            value: i
        })
    }
    return pages;
}

export default function reducerPage(currentState, action) {
    const index = action.data.index === undefined ? 1 : parseInt(action.data.index, 10);
    const count = currentState.meta.pages.page.length;

    //if (currentState.index === index && currentState.type === TYPE_PAGE) {
       // return currentState;
    //} else {
        let newState = {
            type: TYPE_PAGE,
            index,
            verse: currentState.quran.filter(function (aya) {
                return aya.page === index
            })
        }

        //if (action.type === ACTION_LOAD || currentState.type !== TYPE_PAGE) {
            let pages = getPages(count);
            newState.pages = pages;
            newState.maxPage = count;
        //}

        return Object.assign({}, currentState, newState);
    //}
}