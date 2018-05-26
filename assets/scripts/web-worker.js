'use strict';

function getSura (quran, suraIndex) {
    var sura = quran.Sura || [];
    return [sura[suraIndex]] || [];
}

function getObjectProperty (obj, property) {
    return property.split('.').reduce(function (acc, prop) {
        return acc && acc[prop];
    }, obj);
}

function getSuraAyas(Sura, start, end) {
    var i = start[0],
        j = start[1] - 1,
        s2 = end[0],
        p2 = end[1] - 1,
        response = [],
        ayas,
        aya;

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

function getPage(Quran, i) {
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

var TYPE_PAGE = 'page';
var TYPE_SURA = 'sura';
var ACTION_GOTO_INDEX = 'GOTO_INDEX';

function getVerse (type, index, source) {
    switch (type) {
        case TYPE_SURA:
            return getSura(source, index);
        case TYPE_PAGE:
            return getPage(source, index);
        default:
            return [];
    }
}

//import prepare from './prepare';

function onMessage (e) {
    var worker = e.target,
        eData = e.data,
        message = eData.message,
        messageId = eData.messageId,
        data = message.data;

    switch (message.action) {
        /*case ACTION_LOAD:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: prepare(data)
            });
            break;*/
        case ACTION_GOTO_INDEX:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: getVerse(data.type, data.index, data.quran)
            });
            break;
        default:
            console.log(message);
    }
}

self.onmessage = onMessage;
