import getObjectProperty from '../utils/object/getproperty';

function getPageTypeOptions(count) {
    return Array.apply(null, Array(count)).map((item, index) => {
        const i = index + 1;
        return {
            text: i,
            value: i
        }
    });
}

function getSuraTypeOptions(suraList) {
    return suraList.filter(page => {
        return !!page.name
    }).map(page => {
        return {
            text: `${page.tname} ${page.name}`,
            value: page.index
        }
    });
}

export default function (state) {
    var suraList, maxPages;
    switch (state.pageType) {
        case 'sura':
            suraList = getObjectProperty(state, 'quran.Sura') || [];
            return Object.assign({}, state, {
                pagingOptions: getSuraTypeOptions(suraList)
            });
        case 'page':
            maxPages = getObjectProperty(state, 'quran.Page.length');
            return Object.assign({}, state, {
                pagingOptions: getPageTypeOptions(maxPages)
            });
        default:
            return state;
    }
}
