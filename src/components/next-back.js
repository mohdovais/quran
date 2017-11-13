import {
    h,
    Component
} from 'preact';
import capitalize from '../utils/capitalize';
import {SURA_AR} from '../constants';
import {ACTION_GOTO_INDEX} from '../constants';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = this.getStoreState(props.store);
    }

    // after the component gets mounted to the DOM
    componentDidMount() {
        const me = this,
            store = me.props.store;

        me.unsubscribe = store && store.subscribe(() => {
            const newState = me.getStoreState(store);
            me.setState(function (prevState, props) {
                return newState;
            });
        })
    }

    getStoreState(store) {
        const storeState = store && store.getState() || {};
        const chapters = storeState.pageChapters.map(function (pageChapter) {
            return pageChapter.chapter;
        });
        return {
            index: storeState.pageIndex || 0,
            max: storeState.pagingOptions.length,
            type: storeState.pageType,
            chapters: storeState.pageChapters
        }
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
        const state = this.state;
        const max = state.max;
        const index = state.index;
        const chapters = state.chapters
            .map(function (chapter) {
                //https://stackoverflow.com/questions/29988144/concat-rtl-string-with-ltr-string-in-javascript
                return  '\u202B' + SURA_AR + ' ' + chapter.name + '\u202C';
            })
            .join(', ');

        return (
            <nav class="nav">
                <span lang="ar">{chapters}</span>
                <button class="prev" disabled={index < 2} onClick={me.previous.bind(me)}>&#9001; Previous</button>
                <span class="text">{capitalize(state.type)} {index} of {max}</span>
                <button class="next" disabled={index >= max} onClick={me.next.bind(me)}>Next &#9002;</button>
            </nav>
        )
    }

    // prior to removal from the DOM
    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }
}
