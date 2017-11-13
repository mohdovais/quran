import getObjectProperty from '../object/getproperty';

export default function getPage(source, index) {
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
