import {
    h,
    Component
} from 'preact';

export default class Footer extends Component{

    constructor(props) {
        super(props);

        const me = this,
            store = props.store,
            newState = store && store.getState() || {};
        
        me.setState(newState);
        
    }

    // after the component gets mounted to the DOM
    componentDidMount() {
        var me = this,
            store = me.props.store,
            newState = store && store.getState() || {};
        
        me.unsubscribe = store && store.subscribe(() => {
            me.setState(function(prevState, props) {
                return newState;
            });
        })
    }

    render(props, state){
        return (
            <footer>{state.type} {state.index} of {state.maxPage}</footer>
        );
    }

    // prior to removal from the DOM
    componentWillUnmount() {
        const unsubscribe = this.unsubscribe;
        unsubscribe && unsubscribe();
    }

}