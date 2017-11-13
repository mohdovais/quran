import {
    h,
    Component
} from 'preact';
import Sura from './sura';

export default class Content extends Component {

    constructor(props) {
        super(props);
        this.state = this.getStoreState(props.store);
    }

    // after the component gets mounted to the DOM
    componentDidMount() {
        var me = this,
            store = me.props.store;

        me.unsubscribe = store.subscribe(() => {
            me.setState(function(prevState, props) {
                return me.getStoreState(store)
            });
        })
    }

    getStoreState(store) {
        const state = store && store.getState() || {};
        return {
            chapters: state.pageChapters || []
        }
    }

    render(props, state) {
        return (
            <main>{
                state.chapters.map(function(chapter){
                    return <Sura data={chapter} />
                })
            }</main>
        );
    }

    // prior to removal from the DOM
    componentWillUnmount() {
        this.unsubscribe();
    }

}
