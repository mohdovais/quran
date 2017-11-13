import {
    TYPE_PAGE
} from '../constants';
import getObjectProperty from '../utils/getObjectProperty';

function getPageOptions(count) {
    return Array.apply(null, Array(count)).map((v, i) => {
        const j = i + 1;
        return {
            text: j,
            value: j
        }
    });
}

function getChapters(index, source) {
    let chapters = [];
    const suras = getObjectProperty(source, 'meta.suras.sura');
    const groups = source.quran.filter(function (aya) {
        return aya.page === index
    }).reduce(function (accum, item) {
        let ayas = accum[item.sura] || [];
        ayas.push(item);
        accum[item.sura] = ayas;
        return accum;
    }, {});

    for (let suraIndex in groups) {
        chapters.push(Object.assign({}, suras[suraIndex - 1], {
            ayas: groups[suraIndex]
        }))
    }

    return chapters;
}

export default function reducerPage(currentState, action) {
    const index = action.data.index === undefined ? 1 : parseInt(action.data.index, 10);
    const maxPages = getObjectProperty(currentState, 'source.meta.pages.page.length');
    return Object.assign({}, currentState, {
        display: Object.assign({}, currentState.display, {
            type: TYPE_PAGE,
            index,
            typeOptions: getPageOptions(maxPages),
            chapters: getChapters(index, currentState.source)
        })
    });
}
