import guid from '../utils/guid';

function WebWorker(worker){
    const me = this;
    me.callbacks = Object.create(null);
    me.worker = worker;
    me.worker.onmessage = me.onMessage.bind(me);
}

WebWorker.prototype.onMessage = function(e) {
    var response = e.data;
    var callback = this.callbacks[response.messageId];

    if (callback) {
        delete this.callbacks[response.messageId];
        callback(false, response.data);
    }
}

WebWorker.prototype.postMessage = function(message) {
    const me = this;
    return new Promise(function (resolve, reject) {
        const messageId = guid();
        me.callbacks[messageId] = function (error, result) {
            if (error) {
                return reject(new Error(error.message));
            }
            resolve(result);
        };
        me.worker.postMessage({
            messageId,
            message
        });
    });
}

export default WebWorker;
