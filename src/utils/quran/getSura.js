export default function (source, suraIndex) {
    const hasSource = source.quran.length > 0;
    var suraList, chapter;

    if (hasSource) {
        suraList = source.meta.suras.sura || [];
        chapter = suraList[suraIndex - 1];
        return chapter ? [Object.assign({}, chapter, {
            ayas: source.quran.filter(function (aya) {
                return aya.sura === suraIndex;
            })
        })] : [];
    }

    return [];
}
