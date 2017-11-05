import {
    h,
    Component
} from 'preact';
import Filter from './filter';
import NextBack from './next-back';

export default class Header extends Component{

    render(props){
        return (
            <header>
                <Filter store={props.store} />
                <NextBack store ={props.store} />
            </header>
        );
    }

}
