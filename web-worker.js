onmessage = function (e) {
    var req = e.data;
    switch(req.type){
        case 'merge':
            postMessage({
                type: 'merge',
                data: mergeRequest(req.data)
            });
    }
}

function AyaMap(aya){
    return {
        index: parseInt(aya.index, 10),
        text: aya.text,
        sura: parseInt(this.index, 10),
        ruku: aya.ruku || false,
        sajda: aya.sajda || false
    }
}

function chaptersReducer(accum, chapter){
    var aya = chapter.aya || [];
    return accum.concat(aya.map(AyaMap, chapter))
}

function mergeRequest(data){
    var chapters = data.chapters || [];
    var meta = data.meta || {};

    //Sajda
    meta.sajdas.sajda.forEach(function(sajda){
        var suraIndex = parseInt(sajda.sura, 10) - 1;
        var ayaIndex = parseInt(sajda.aya, 10) - 1;
        chapters[suraIndex].aya[ayaIndex].sajda = sajda.type;
    });

    //Ruku
    meta.rukus.ruku.forEach(function(ruku){
        var suraIndex = parseInt(ruku.sura, 10) - 1;
        var ayaIndex = parseInt(ruku.aya, 10) - 2;
        var index = parseInt(ruku.index, 10) - 1;
        var aya = chapters[suraIndex].aya[ayaIndex];
        var chapter;

        if(!aya){
            chapter = chapters[suraIndex - 1];
            aya = chapter && chapter.aya[chapter.aya.length - 1];
        }

        if(aya){
            aya.ruku = index;
        }
    });

    return {
        quran: chapters.reduce(chaptersReducer, []),
        meta: meta
    }

}
