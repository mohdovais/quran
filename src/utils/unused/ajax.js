//https://gist.github.com/azproduction/1625623
export default function (
    method, // method - get, post, whatever
    url, // url
    callback, // [callback] if passed -> asych call
    data // [post_data]
) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (event) { // filter only readyState=4 events
        xhr.readyState ^ 4 || callback.call(this, xhr, xhr.status === 200); // if callback passed and readyState == 4 then trigger Callback with xhr object
    };
    xhr.open(method.toUpperCase(), url, true);
    xhr.send(data);
    return xhr;
}