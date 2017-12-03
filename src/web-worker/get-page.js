import getObjectProperty from '../utils/object/getproperty';

function getSuraAyas(Sura, start, end) {
    var i = start[0],
        j = start[1] - 1,
        s2 = end[0],
        p2 = end[1] - 1,
        response = [],
        ayas, aya;

    for (; i <= s2; i++) {
        aya = Sura[i].ayas[j];
        ayas = [];
        while (aya) {
            if (aya === Sura[s2].ayas[p2]) {
                break;
            } else {
                ayas.push(aya);
                j++;
                aya = Sura[i].ayas[j];
            }
        }

        if (ayas.length > 0) {
            response.push(Object.assign({}, Sura[i], {
                ayas: ayas
            }));
        }

        j = 0;
    }

    return response;
}

export default function getPage(Quran, i) {
    var pages = getObjectProperty(Quran, 'Page') || [],
        suras = getObjectProperty(Quran, 'Sura') || [],
        start = pages[i],
        end = pages[i + 1];

    if (start && end) {
        return getSuraAyas(suras, start, end);
    } else {
        return [];
    }
}
