import {ACTION_GOTO_INDEX} from '../constants';

export function gotoIndex(type, index){
    return {
        type: ACTION_GOTO_INDEX,
        data: {
            type,
            index
        }
    }
}
