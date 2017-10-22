import {
    h,
    Component
} from 'preact';
import {toArabicNumber} from '../utils/utils';

export default class Aya extends Component {
    render(){
        const aya = this.props.attr;
        const verseClass = 'verse' + (aya.sajda ? ' sajda' : '');
        const countClass = 'ayaNumber' + (aya.ruku ? ' ruku' : '');
        const id = `s${aya.sura}-a${aya.index}`;
        const title = aya.ruku ? `Ruku ${aya.ruku}`: '';
        return (
            <span class={verseClass} id={id}>
                {aya.text}
                <span class={countClass} title={title}>{toArabicNumber(aya.index)}</span>
            </span>
        )
    }
}