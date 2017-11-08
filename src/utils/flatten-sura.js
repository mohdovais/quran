import '../polyfills/object-assign';

export default function flattenSura(suras) {
    return suras.reduce(function (accumulator, sura) {
        return accumulator.concat(sura.aya.map(function (obj) {
            return Object.assign({}, obj, {
                    index: parseInt(obj.index, 10),
                    sura: parseInt(sura.index, 10)
                });
        }));
    }, []);
}
