import {
    h,
    Component
} from 'preact';
import Filter from './filter';

export default class Header extends Component{

    render(props){
        return (
            <header>
                <Filter store={props.store} />    
            </header>
        );
    }

}