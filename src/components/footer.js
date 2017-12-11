import {
    h,
    Component
} from 'preact';
import NextBack from './next-back';

export default class Footer extends Component{

    render(){
        return (
            <footer><NextBack {...this.props} /></footer>
        );
    }

}
