import {applyTpl, toArabicNumber} from './utils';

var bismillah = '\u00d8\u00a8\u00d9\u0090\u00d8\u00b3\u00d9\u2019\u00d9\u2026\u00d9\u0090 \u00d8\u00a7\u00d9\u201e\u00d9\u201e\u00d9\u017d\u00d9\u2018\u00d9\u2021\u00d9\u0090 \u00d8\u00a7\u00d9\u201e\u00d8\u00b1\u00d9\u017d\u00d9\u2018\u00d8\u00ad\u00d9\u2019\u00d9\u2026\u00d9\u017d\u00d9\u2020\u00d9\u0090 \u00d8\u00a7\u00d9\u201e\u00d8\u00b1\u00d9\u017d\u00d9\u2018\u00d8\u00ad\u00d9\u0090\u00d9\u0160\u00d9\u2026\u00d9\u0090';


function getVerseCount(item) {
    return '<span class="verse-count" data-index="' + item.index + '"></span>';
}

function getBismillah(item) {
    return item.bismillah ? '<img height="48px" width="100%" src="assets/images/bismillah.svg" alt="' + bismillah + '" />' : '';
}

function getSuraName(item, meta) {
    var sura = meta.suras.sura[item.sura - 1];
    return '<h2 class="sura-name"><img src="assets/images/sura-title/' + item.sura + '.svg" alt="' + sura.name + '" /></h2>';
}

function verseReducer(acc, aya, index, arr) {
    var isFirstLineOfSura = aya.index === 1,
        isLastLine = index === arr.length - 1,
        suraName = isFirstLineOfSura ? getSuraName(aya, acc.meta) : '',
        bismillah = isFirstLineOfSura ? getBismillah(aya) : '';

    acc.response += applyTpl(
        '${0}${1}${2}${3}<li class="verse ${4}">${5}<span class="${6}">${7}</span></li>${8}',
        isFirstLineOfSura && index !== 0 ? '</ol>' : '',
        suraName,
        bismillah,
        isFirstLineOfSura || index === 0 ? '<ol lang="ar" start="' + aya.index + '">' : '',
        aya.sajda ? ' sajda' : '',
        aya.text,
        'ayaNumber' + (aya.ruku ? ' ruku' : ''),
        toArabicNumber(aya.index),
        isLastLine ? '</ol>' : ''
    );

    return acc;
}

function render(verse, meta) {
    return verse.reduce(verseReducer, {
        response: '',
        meta: meta
    }).response;
}

export default render;