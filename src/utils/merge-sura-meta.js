import '../polyfills/object-assign';
import '../polyfills/array-find.js';

export default function mergeMeta(ayas, meta) {
    var p = 1;
    var r = 1;
    return ayas.map(function (aya, index, array) {
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
            isRuku = ruku.index;
            r++;
        }

        return (Object.assign(Object.create(null), {
            page: p,
            sajda: sajda && sajda.type || false,
            ruku: isRuku
        }, aya));
    });
}