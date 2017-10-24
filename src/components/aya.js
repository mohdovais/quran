import {
    h,
    Component
} from 'preact';
import {toArabicNumber} from '../utils/utils';
import SvgAya from './svg-aya';

/**
 * Ruku
 * outline: '#19435c'
 * Inner: '#d2d9f5'
 * bgColor: '#a1c8e5';
 */

export default class Aya extends Component {
    render(){
        const aya = this.props.attr;
        const verseClass = 'verse' + (aya.sajda ? ' sajda' : '');
        const id = `s${aya.sura}-a${aya.index}`;
        const bgColor = aya.ruku  ? '#d2d9f5' : null;
        return (
            <span class={verseClass} id={id}>
                {aya.text}
                <SvgAya className='aya-count' bgColor={bgColor}>
                    {toArabicNumber(aya.index)}
                </SvgAya>
            </span>
        )
    }
}