import onMessageThread from './onMessage';

function FakeWebWorker() {}

FakeWebWorker.prototype.postMessage = function (message) {
    const me = this;
    const onmessage = typeof me.onmessage === 'function' ? me.onmessage : function(){}
    onMessageThread({
        target: {
            postMessage: function(message){
                onmessage({
                    data: message
                })
            }
        },
        data: message
    })
}

export default FakeWebWorker;
