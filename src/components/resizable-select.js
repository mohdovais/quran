import {
    h,
    Component
} from 'preact';
import resizeSelect from '../utils/dom/select-width';



export default class Select extends Component {

    updateWidth() {
        var me = this;
        window.requestAnimationFrame(function () {
            //var node = me.getDOMNode();
            var node = me.base;
            if (node !== undefined) {
                setTimeout(resizeSelect, 100, node);
            }
        });
    }

    componentDidMount() {
        this.updateWidth();
    }

    // and or
    componentDidUpdate() {
        this.updateWidth();
    }

    render() {
        return <select {...this.props}>{this.props.children}</select>
    }
}
