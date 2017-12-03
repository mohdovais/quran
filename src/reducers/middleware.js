import pagingReducer from './paging-options';
import hasOwnProperty from '../utils/object/hasOwnProperty';
import WebWorkerPromise from '../utils/webWorkerPromise';
import FakeWebWorker from '../web-worker/fake.js'
import copy from '../utils/object/extend';
import {
    ACTION_LOAD,
    ACTION_GOTO_INDEX,
    ACTION_CHANGE_TYPE,
    ACTION_PAGING_OPTIONS,
    ACTION_APPLY
} from '../constants';

const worker = window.Worker ? new Worker('assets/scripts/web-worker.js') : new FakeWebWorker();
const workerPromise = new WebWorkerPromise(worker);

export default function (args) {
    const getState = args.getState;

    return next => action => {
        const currentState = getState();
        const actionData = action.data;
        switch (action.type) {
            case ACTION_GOTO_INDEX:

                if (!hasOwnProperty(actionData, 'type') || !hasOwnProperty(actionData, 'index')) {
                    throw 'Missing parameters'
                }

                workerPromise
                    .postMessage({
                        action: ACTION_GOTO_INDEX,
                        data: {
                            type: actionData.type,
                            index: actionData.index,
                            quran: currentState.quran
                        }
                    })
                    .then(function (data) {
                        next({
                            type: ACTION_APPLY,
                            data: {
                                lastPropertyChanged: 'pageIndex',
                                pageIndex: actionData.index,
                                pageType: actionData.type,
                                pageChapters: data
                            }
                        })
                    });
                break;

            case ACTION_LOAD:
                    next({
                        type: ACTION_APPLY,
                        data: copy(actionData, {
                            lastPropertyChanged: 'quran',
                        })
                    })

                break;

            case ACTION_PAGING_OPTIONS:
                next({
                    type: ACTION_APPLY,
                    data: copy(pagingReducer(currentState), {
                        lastPropertyChanged: 'pagingOptions'
                    })
                });
                break;

            case ACTION_CHANGE_TYPE:
                next({
                    type: ACTION_APPLY,
                    data: {
                        lastPropertyChanged: 'pageType',
                        pageType: actionData.type
                    }
                });
                break;

            default:
                next(action)
        }
    }
}
