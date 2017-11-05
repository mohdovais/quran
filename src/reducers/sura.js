import {
    TYPE_SURA
} from '../constants';
import getObjProp from '../utils/getObjectProperty';

function getSuraTypeOptions(suraList) {
    return suraList.map((page => {
        return {
            text: `${page.name} ${page.tname}`,
            value: page.index
        }
    }));
}

function getChapters(index, quran, suraMeta) {
    return [Object.assign({},
        suraMeta, {
            ayas: quran.filter((aya) => {
                return aya.sura === index;
            })
        })];
}


export default function reducerSura(currentState, action) {
    const source = currentState.source;
    const suraList = getObjProp(source, 'meta.suras.sura') || [];
    const index = action.data.index === undefined ? 1 : parseInt(action.data.index, 10);

    return Object.assign({}, currentState, {
        display: {
            index,
            type: TYPE_SURA,
            typeOptions: getSuraTypeOptions(suraList),
            chapters: getChapters(index, source.quran, suraList[index - 1])
        }
    });
}
