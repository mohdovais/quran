(function () {
'use strict';

function AyaMap(aya) {
    return {
        index: parseInt(aya.index, 10),
        sura: parseInt(this.index, 10),
        text: aya.text,
        bismillah: aya.bismillah || false
    };
}

function chaptersReducer(accum, sura) {
    var aya = sura.aya || [];
    return accum.concat(aya.map(AyaMap, sura));
}

var prepare = function (data) {
    var p = 1;
    var r = 1;
    var meta = data.meta;
    var quran = data.quran.reduce(chaptersReducer, []).map(function (aya, index, array) {
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

        return Object.assign(Object.create(null), {
            page: p,
            sajda: sajda && sajda.type || false,
            ruku: isRuku
        }, aya);
    });

    return {
        quran: quran,
        meta: meta
    };
};

var getSura = function (source, suraIndex) {
    var hasSource = source.quran.length > 0;
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
};

var getObjectProperty = function (obj, property) {
    return property.split('.').reduce(function (acc, prop) {
        return acc && acc[prop];
    }, obj);
};

function getPage(source, index) {
    var chapters = [];
    var suras = getObjectProperty(source, 'meta.suras.sura');
    var groups = source.quran.filter(function (aya) {
        return aya.page === index;
    }).reduce(function (accum, item) {
        var ayas = accum[item.sura] || [];
        ayas.push(item);
        accum[item.sura] = ayas;
        return accum;
    }, {});

    for (var suraIndex in groups) {
        chapters.push(Object.assign({}, suras[suraIndex - 1], {
            ayas: groups[suraIndex]
        }));
    }

    return chapters;
}

var TYPE_PAGE = 'page';
var TYPE_SURA = 'sura';
var ACTION_LOAD = 'LOAD';
var ACTION_GOTO_INDEX = 'GOTO_INDEX';

var getVerse = function (type, index, source) {
    switch (type) {
        case TYPE_SURA:
            return getSura(source, index);
        case TYPE_PAGE:
            return getPage(source, index);
        default:
            return [];
    }
};

var onMessage = function (e) {
    var worker = e.target,
        eData = e.data,
        message = eData.message,
        messageId = eData.messageId,
        data = message.data;

    switch (message.action) {
        case ACTION_LOAD:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: prepare(data)
            });
            break;
        case ACTION_GOTO_INDEX:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: getVerse(data.type, data.index, data.source)
            });
            break;
        default:
            console.log(message);
    }
};

self.onmessage = onMessage;

}());
//# sourceMappingURL=web-worker.js.map
