// To do so, we use this function.
export function deepFreeze(obj) {

    // Retrieve the property names defined on obj
    var propNames = Object.getOwnPropertyNames(obj);

    // Freeze properties before freezing self
    propNames.forEach(function (name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && prop !== null)
            deepFreeze(prop);
    });

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
}

export function applyTpl(str) {
    var args = Array.prototype.slice.call(arguments, 1);
    return String(str).replace(/\${(\d)}/g, function(a, b) {
        return (a = args[parseInt(b, 10)]) === undefined ? '' : a;
    });
}

export function tpl(str) {
    str = String(str);
    return {
        apply: function(){
            var args = Array.prototype.slice.call(arguments);
            return str.replace(/\${(\d)}/g, function(a, b) {
                return (a = args[parseInt(b, 10)]) === undefined ? '' : a;
            });
        }
    }
}

////"٠١٢٣٤٥٦٧٨٩"
export function toArabicNumber(num) {
    return String(num).split('').reduce(function (acc, n) {
        return (acc += "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".substr(parseInt(n), 1));
    }, '');
}

export function flattenSura(suras) {
    return suras.reduce(function (acc, sura) {
        return acc.concat(sura.aya.map(function (obj) {
            return Object.assign({
                sura: parseInt(sura.index, 10)
            }, obj, {
                index: parseInt(obj.index)
            });
        }));
    }, []);
}

export function mergeMeta(ayas, meta) {
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