import {
    h,
    Component
} from 'preact';
import getObjectProperty from '../utils/getObjectProperty';
import {gotoIndex} from '../actions';

export default class Filter extends Component {

    constructor(props) {
        super(props);
        const store = props.store;
        this.state = store && store.getState() || {};
    }

    // after the component gets mounted to the DOM
    componentDidMount() {
        const me = this,
            store = me.props.store;
        
        me.unsubscribe = store && store.subscribe(() => {
            me.setState(function(prevState, props) {
                return store && store.getState() || {}
            });
        })
    }

    handleSubmit(event){
        event.preventDefault();
    }

    gotoIndex(index, event){
        event.preventDefault();
        if(index > 0 && index <= this.state.maxPage){
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
            type: 'CHANGE_TYPE',
            data: {
                type,
                index: 1
            }
        });
    }

    previous(event){
        this.gotoIndex(this.state.index - 1, event);
    }

    next(event){
        this.gotoIndex(this.state.index + 1, event);
    }

    getOptions(pages, selectedIndex){
        const _pages = pages || [];
        return _pages.map(function(page, i){
                    return (
                        <option value={page.value} selected={selectedIndex === i}>
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
            })
    }

    render(props, state) {
        const me = this,
            index = (state.index || 1 ) - 1,
            options = me.getOptions(state.pages, index),
            types = me.getTypes(state.types, state.type);
        
        return (
            <form onSubmit={me.handleSubmit.bind(me)}>
            <fieldset>
                <legend>{state.type}</legend>
                <button disabled={index < 1} onClick={me.previous.bind(me)}>Previous {state.type}</button>
                <select onChange={me.onTypeChange.bind(me)} aria-label="Select type">{types}</select>
                <select disabled={state.maxPage < 2} onChange={me.onSelectionChange.bind(me)} aria-label="Select page">{options}</select>
                <button disabled={state.index >= state.maxPage} onClick={me.next.bind(me)}>Next {state.type}</button>
            </fieldset>
            </form>
        )
    }

    // prior to removal from the DOM
    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }
}