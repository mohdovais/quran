import xml2json from './xml2json';

export default function (url) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.text()
        })
        .then(text => (new window.DOMParser()).parseFromString(text, "text/xml"))
        .then(xml => xml2json(xml))
}
