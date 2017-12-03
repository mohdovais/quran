//import prepare from './prepare';
import getVerse from './get-verse';
import {ACTION_LOAD, ACTION_GOTO_INDEX} from '../constants';

export default function (e) {
    var worker = e.target,
        eData = e.data,
        message = eData.message,
        messageId = eData.messageId,
        data = message.data;

    switch (message.action) {
        /*case ACTION_LOAD:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: prepare(data)
            });
            break;*/
        case ACTION_GOTO_INDEX:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: getVerse(data.type, data.index, data.quran)
            });
            break;
        default:
            console.log(message)
    }
}
