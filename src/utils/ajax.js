export default function (url, callback, _method, data) {
    const method = _method && _method.toUpperCase() || 'GET';
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr);
        xhr.onerror = () => reject(xhr);
        xhr.open(method, url, true);
        xhr.send(data);
    });
}
