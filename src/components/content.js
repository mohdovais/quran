import {
    h,
    Component
} from 'preact';
import Sura from './sura';

export default class Content extends Component {

    constructor(props) {
        super(props);
    }

    // after the component gets mounted to the DOM
    componentDidMount() {
        var me = this,
            store = me.props.store;
        
        me.unsubscribe = store.subscribe(() => {
            me.setState(function(prevState, props) {
                return store.getState();
            });
        })
    }

    /**
     * 
     * @param {Array} verse 
     */
    getVerse(verse, meta){

        const groups = verse.reduce(function(accum, aya){
            const ayat = accum[aya.sura] || (accum[aya.sura] = []);
            ayat.push(aya);
            return accum;
        }, {});

        return Object.keys(groups).reduce(function(accum, groupName){
            accum.push(<Sura data={groups[groupName]} meta={meta} />);
            return accum;
        }, []);
    }

    render(props, state) {
        const ayat = this.getVerse(state.verse || [], state.meta);
        return (
            <main>{ayat}</main>
        );
    }
        
    // prior to removal from the DOM
    componentWillUnmount() {
        this.unsubscribe();
    }

}