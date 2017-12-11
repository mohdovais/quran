import {
    h,
    Component
} from 'preact';
import NextBack from './next-back';

export default class Header extends Component{

    render(){
        return (
            <header>
                <NextBack {...this.props} />
            </header>
        );
    }
}
