import MetaData from '../../assets/data/quran-data';

//bismillah char codes
const bismillahCharCodes = '1576,1616,1587,1618,1605,1616,32,1575,1604,1604,1617,1614,1607,1616,32,1575,1604,1585,1617,1614,1581,1618,1605,1614,1606,1616,32,1575,1604,1585,1617,1614,1581,1616,1610,1605,1616,32,';
const bismillahRegExp = new RegExp(`^(${bismillahCharCodes})(.*)`, 'ig')

function charCodesAt(str) {
    return str.split('').map(function (char) {
        return char.charCodeAt()
    }).join(',')
}

function charCodesFrom(str) {
    return str.split(',').map(function (code) {
        return String.fromCharCode(code)
    }).join('')
}

function previousAyatIndex(ayat, Sura) {
    const suraNumber = ayat[0],
        ayatIndex = ayat[1] - 1, // aya start with 0
        prevAyat = Sura[suraNumber].ayas[ayatIndex - 1];

    if (prevAyat) {
        return [suraNumber, ayatIndex - 1];
    } else {
        return [suraNumber - 1, Sura[suraNumber - 1].ayas.length - 1]
    }
}

function previousAyat(ayat, Sura) {
    const prev = previousAyatIndex(ayat, Sura);
    return Sura[prev[0]].ayas[prev[1]]
}


function mapSura(sura, index) {
    var suraHasBismillah = false;

    // [start, ayas, order, rukus, name, tname, ename, type]
    const start = sura[0],
        count = sura[1],
        ayas = this.slice(start, start + count).map(function (_aya, i) {
            let aya, exec, hasBismillah;
            exec = bismillahRegExp.exec(charCodesAt(_aya));

            if (i === 0 && exec) {
                aya = charCodesFrom(exec[2]);
                suraHasBismillah = hasBismillah = true;
            } else {
                aya = _aya;
            }

            aya = {
                text: aya,
                sura: index,
                index: i + 1
            }

            if (hasBismillah) {
                aya.bismillah = true;
            }

            return aya;
        });

    return {
        ayas,
        bismillah: suraHasBismillah,
        order: sura[2],
        rukus: sura[3],
        name: sura[4],
        tname: sura[5],
        ename: sura[6],
        type: sura[7],
        index
    };
}

export default function processQuranText(quranText) {
    const Sura = MetaData.Sura.map(mapSura, quranText.split('\r\n'));

    MetaData.Sajda.forEach(sajda => {
        const suraNumber = sajda[0],
            ayatIndex = sajda[1] - 1;

        suraNumber && (Sura[suraNumber].ayas[ayatIndex].sajda = sajda[2]);
    });

    MetaData.Ruku.forEach(function(ruku, index){
        const ayat = ruku.length > 0 && previousAyat(ruku, Sura);
        if (ayat) {
            ayat.ruku = index - 1;
        }
    });

    MetaData.Manzil.forEach(manzil => {
        const suraNumber = manzil[0],
            ayatIndex = manzil[1] - 1;

        if(suraNumber){
            Sura[suraNumber].ayas[ayatIndex].manzil = true
        }
    });

    return Object.assign({}, MetaData, {
        Sura
    });

}
