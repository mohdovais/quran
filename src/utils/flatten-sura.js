import '../polyfills/object-assign';

export default function flattenSura(suras) {
    return suras.reduce(function (accumulator, sura) {
        return accumulator.concat(sura.aya.map(function (obj) {
            return Object.assign({
                sura: parseInt(sura.index, 10)
            }, obj, {
                index: parseInt(obj.index)
            });
        }));
    }, []);
}