import {
    TYPE_SURA,
    ACTION_LOAD
} from '../constants';

function getPages(suraList) {
    return suraList.map((page => {
        return {
            text: `${page.name} ${page.tname}`,
            value: page.index
        }
    }));
}

export default function reducerSura(currentState, action) {
    const index = action.data.index === undefined ? 1 : parseInt(action.data.index, 10);
    //if (action.type !== ACTION_LOAD && currentState.type === TYPE_SURA && currentState.index === index) {
        //return currentState;
    //} else {

    
        let suraList = currentState.meta.suras.sura;
        let newState = {
            type: TYPE_SURA,
            index,
            verse: currentState.quran.filter((aya) => {
                return aya.sura === index;
            })
        };

        //if (action.type === ACTION_LOAD || currentState.type !== TYPE_SURA) {
            newState.maxPage = suraList.length;
            newState.pages = getPages(suraList);
        //}

        return Object.assign({}, currentState, newState);
    //}
}