import prepare from '../utils/quran/prepare';
import getVerse from '../utils/quran/getVerse';
import {ACTION_LOAD, ACTION_GOTO_INDEX} from '../constants';

export default function (e) {
    var worker = e.target,
        eData = e.data,
        message = eData.message,
        messageId = eData.messageId,
        data = message.data;

    switch (message.action) {
        case ACTION_LOAD:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: prepare(data)
            });
            break;
        case ACTION_GOTO_INDEX:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: getVerse(data.type, data.index, data.source)
            });
            break;
        default:
            console.log(message)
    }
}
