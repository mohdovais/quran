import xml2json from './xml2json';
import ajax from './ajax';
import render from './render';
import {flattenSura, mergeMeta} from './utils';

var data;
var metaData;
var currPage = 1;

function gotoPage(pageNumber){
    var page = data.filter(function (item) {
        return item.page === pageNumber;
    })

    document.getElementById('root').innerHTML = render(page, metaData);
}

function gotoSura(suraNumber){
    var sura = data.filter(function (item) {
        return item.sura === suraNumber;
    })

    document.getElementById('root').innerHTML = render(sura, metaData);
}


function init(ayas, meta) {
    var _ayas = flattenSura(ayas);

    metaData = meta;
    data = mergeMeta(_ayas, meta);

    document.getElementById('sura').innerHTML = metaData.suras.sura.map(function(s){
        return '<option value="' + s.index + '">' + s.index + ' ' + s.tname + ' - ' + s.name + ' (' + s.ename + ')</option>';
    }).join('') + '<optgroup></optgroup>';

    gotoSura(1);
}

var dom = {
    suraSelect: document.getElementById('sura'),
    prevButton: document.getElementById('prev'),
    nextButton: document.getElementById('next')
}

dom.suraSelect.form.addEventListener('submit', function(e){
    e.preventDefault();
    gotoSura(parseInt(e.target.sura.value, 10) || 1);
});

dom.suraSelect.addEventListener('change', function(e){
    gotoSura(parseInt(e.target.value, 10) || 1);
});

dom.prevButton.addEventListener('click', function(){
    var select = dom.suraSelect,
        index = select.selectedIndex;

    if(index > 0){
        select.selectedIndex = index -1;
    }
});

dom.nextButton.addEventListener('click', function(){
    var select = dom.suraSelect,
        index = select.selectedIndex;
        
    if(index < select.options.length - 1){
        select.selectedIndex = index + 1;
    }
})

var promiseData = new Promise(function (resolve, reject) {
    ajax('get', 'assets/xml/quran-simple.xml', function (xhr, success) {
        if (success) {
            var ayas = xml2json(xhr.responseXML).quran.sura;
            resolve(ayas);
        } else {
            reject(xhr.statusText + ': ' + xhr.responseURL);
        }
    });
});


var promiseMeta = new Promise(function (resolve, reject) {
    ajax('get', 'assets/xml/quran-data.xml', function (xhr, success) {
        if (success) {
            var metadata = xml2json(xhr.responseXML).quran;
            resolve(metadata);
        } else {
            reject(xhr.statusText + ': ' + xhr.responseURL);
        }
    });
});


Promise.all([promiseData, promiseMeta]).then(function (values) {
    init.apply(this, values);
}).catch(function(reason) {
    console.log(reason)
});
