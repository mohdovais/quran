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
    return suraList.map((page => {
        return {
            text: `${page.name} ${page.tname}`,
            value: page.index
        }
    }));
}

export default function (state) {
    var suraList, maxPages;
    switch (state.pageType) {
        case 'sura':
            suraList = getObjectProperty(state, 'source.meta.suras.sura') || [];
            return Object.assign({}, state, {
                pagingOptions: getSuraTypeOptions(suraList)
            });
        case 'page':
            maxPages = getObjectProperty(state, 'source.meta.pages.page.length');
            return Object.assign({}, state, {
                pagingOptions: getPageTypeOptions(maxPages)
            });
        default:
            return state;
    }
}
