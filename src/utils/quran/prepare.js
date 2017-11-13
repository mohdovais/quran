function AyaMap(aya) {
    return {
        index: parseInt(aya.index, 10),
        sura: parseInt(this.index, 10),
        text: aya.text,
        bismillah: aya.bismillah || false
    }
}

function chaptersReducer(accum, sura) {
    var aya = sura.aya || [];
    return accum.concat(aya.map(AyaMap, sura))
}

export default function (data) {
    var p = 1;
    var r = 1;
    var meta = data.meta;
    var quran = data.quran
        .reduce(chaptersReducer, [])
        .map(function (aya, index, array) {
            var nextAya = array[index + 1];
            var page = meta.pages.page[p];
            var ruku = meta.rukus.ruku[r];
            var isRuku = false;
            var sajda = meta.sajdas.sajda.find(function (s) {
                return s.sura == aya.sura && s.aya == aya.index;
            });

            if (page && aya.sura == page.sura && aya.index == page.aya) {
                p++;
            }

            if (ruku && nextAya.sura == ruku.sura && nextAya.index == ruku.aya) {
                isRuku = parseInt(ruku.index, 10);
                r++;
            }

            return (Object.assign(Object.create(null), {
                page: p,
                sajda: sajda && sajda.type || false,
                ruku: isRuku
            }, aya));
        });

    return {
        quran: quran,
        meta: meta
    }
}
