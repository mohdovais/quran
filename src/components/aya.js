import {
    h,
    Component
} from 'preact';
import toArabicNumber from '../utils/arabic-number';
import SvgAya from './svg-aya';


export default class Aya extends Component {
    render(){
        let bgColor, fillColor, strokeColor;
        const aya = this.props.attr;
        const verseClass = 'verse' + (aya.sajda ? ' sajda' : '');
        const id = `s${aya.sura}-a${aya.index}`;
        const desc = `End of Aya ${aya.index} of Sura ${aya.sura}`;
        if(aya.ruku){
            bgColor = '#d2d9f5';
            fillColor = '#a1c8e5';
            strokeColor = '#19435c';
        }
        return (
            <span class={verseClass} id={id}>
                {aya.text}
                <SvgAya 
                    desc={desc} 
                    className='aya-count' 
                    strokeColor={strokeColor} 
                    bgColor={bgColor} 
                    fillColor={fillColor}
                >
                    {toArabicNumber(aya.index)}
                </SvgAya>
            </span>
        )
    }
}