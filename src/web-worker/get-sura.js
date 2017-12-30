export default function(quran, suraIndex){
    const sura = quran.Sura || [];
    return [sura[suraIndex]] || [];
}
