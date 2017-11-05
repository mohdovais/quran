import {h, Component} from 'preact';
import {gotoIndex} from '../actions';
import {ACTION_CHANGE_TYPE} from '../constants';

export default class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = this.getStoreState(props.store);
    }

    getStoreState(store){
        const state = store && store.getState() || {};
        const display = state && state.display || {};

        return {
            types: state.dispalyTypes || [],
            type: display.type,
            typeOptions: display.typeOptions || [],
            currentIndex: display.index || 0
        }
    }

    // after the component gets mounted to the DOM
    componentDidMount() {
        const me = this,
            store = me.props.store;

        me.unsubscribe = store && store.subscribe(() => {
            me.setState(function() {
                return me.getStoreState(store);
            });
        })
    }

    handleSubmit(event){
        event.preventDefault();
    }

    gotoIndex(index, event){
        event.preventDefault();
        if(index > 0 && index <= this.state.typeOptions.length){
            this.props.store.dispatch(gotoIndex(index));
        }
    }

    onSelectionChange(event){
        const index = parseInt(event.target.value, 10);
        this.gotoIndex(index, event);
    }

    onTypeChange (event){
        const type = event.target.value;
        this.props.store.dispatch({
            type: ACTION_CHANGE_TYPE,
            data: {
                type,
                index: 1
            }
        });
    }

    getOptions(pages, selectedIndex){
        const _pages = pages || [];
        const index = selectedIndex - 1;
        return _pages.map(function(page, i){
                    return (
                        <option value={page.value} selected={index === i}>
                            {page.text}
                        </option>
                    )
                });
    }

    getTypes(types, currentType){
        const _types = types || [];
        return _types.map(function(type){
                return (
                    <option value={type.value} selected={type.value === currentType}>
                        {type.text}
                    </option>
                )
            });
    }

    render(props, state) {
        const me = this,
            options = me.getOptions(state.typeOptions, state.currentIndex),
            types = me.getTypes(state.types, state.type);

        return (
            <form onSubmit={me.handleSubmit.bind(me)}>
            <fieldset>
                <select onChange={me.onTypeChange.bind(me)} aria-label="Select type">{types}</select>
                <select disabled={state.maxPage < 2} onChange={me.onSelectionChange.bind(me)} aria-label="Select page">{options}</select>
            </fieldset>
            </form>
        )
    }

    // prior to removal from the DOM
    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }
}
