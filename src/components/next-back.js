import {
    h,
    Component
} from 'preact';
import capitalize from '../utils/capitalize';
import {SURA_AR} from '../constants';
import {ACTION_GOTO_INDEX} from '../constants';
import observerStore from '../reducers/observe-store';
import objectEquals from '../utils/object/equals';
import Filter from './filter';

export default class extends Component {

    constructor(props) {
        super(props);
        this.unsubscribe = observerStore(props.store, this.reducer.bind(this), this.setState.bind(this));
    }

    getStateFromStore(store) {
        const storeState = store.getState();
        return Object.assign(Object.create(null), {
            index: storeState.pageIndex,
            max: storeState.pagingOptions.length,
            type: storeState.pageType,
            chapters: storeState.pageChapters
        });
    }

    reducer(store, oldState){
        const newState = this.getStateFromStore(store);
        return objectEquals(newState, oldState) ? oldState : newState;
    }

    gotoIndex(index, event) {
        const type = this.state.type;
        event.preventDefault();
        if (index > 0 && index <= this.state.max) {
            this.props.store.dispatch({
                type: ACTION_GOTO_INDEX,
                data: {
                    index,
                    type
                }
            });
        }
    }

    previous(event) {
        this.gotoIndex(this.state.index - 1, event);
    }

    next(event) {
        this.gotoIndex(this.state.index + 1, event);
    }

    render() {
        const me = this;
        const state = me.state;
        const max = state.max;
        const index = state.index;
        const chapters = state.chapters
            .map(function (chapter) {
                //https://stackoverflow.com/questions/29988144/concat-rtl-string-with-ltr-string-in-javascript
                return  chapter ? '\u202B' + SURA_AR + ' ' + chapter.name + '\u202C' : '';
            })
            .join(', ');

            //<span lang="ar">{chapters}</span>
            //<div class="text">{capitalize(state.type)} {index} of {max} <div>{chapters}</div></div>

        return (
            <nav class="nav">
                <button class="next" disabled={index >= max} onClick={me.next.bind(me)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20"><path d="M10,0l2,2l-8,8l8,8l-2,2L0,10L10,0z" fill="#007aff" /></svg>
                    <span>Next</span>
                </button>
                <button class="prev" disabled={index < 2} onClick={me.previous.bind(me)}>
                    <span>Previous</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20"><path d="M 2,0 0,2 8,10 0,18 2,20 12,10 2,0 Z" fill="#007aff" /></svg>
                </button>
                <Filter store={me.props.store} />
            </nav>
        )
    }

    // prior to removal from the DOM
    componentWillUnmount() {
        if(this.unsubscribe){
            this.unsubscribe();
        }
    }
}
