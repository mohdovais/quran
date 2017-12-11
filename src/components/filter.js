import {h, Component} from 'preact';
import {gotoIndex} from '../reducers/actions';
import {ACTION_CHANGE_TYPE} from '../constants';
import Select from './resizable-select';



export default class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = this.getStoreState(props.store);
    }

    getStoreState(store){
        const state = store && store.getState() || {};
        const props = ['dispalyTypes', 'pageIndex', 'pageType', 'pagingOptions'];

        if(props.indexOf(state.lastPropertyChanged) !== -1){
            return {
                types: state.dispalyTypes || [],
                type: state.pageType,
                typeOptions: state.pagingOptions || [],
                currentIndex: state.pageIndex || 0
            }
        }else{
            return this.state;
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
        const me = this;

        event.preventDefault();
        if(index > 0 && index <= me.state.typeOptions.length){
            me.props.store.dispatch(gotoIndex(me.state.type, index));
        }
    }

    onSelectionChange(event){
        const index = parseInt(event.target.value, 10);
        //resizeSelect(event.target);
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
                <Select onChange={me.onTypeChange.bind(me)} aria-label="Select type">{types}</Select>
                &nbsp;
                <Select
                    disabled={state.maxPage < 2}
                    onChange={me.onSelectionChange.bind(me)}
                    aria-label="Select page"
                    dir="rtl"
                >
                    {options}
                </Select>
            </form>
        )
    }

    componentDidUpdate(){
        //console.log(arguments)
    }

    // prior to removal from the DOM
    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }
}
