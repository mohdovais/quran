import {
    h,
    Component
} from 'preact';
import toArabicNumber from '../utils/arabic-number';
import SvgAya from './svg-aya';
import SvgRuku from './svg-ruku';
import SvgSajda from './svg-sajda';


export default class Aya extends Component {
    render(){
        let rukuSign, sajdaSign, bgColor, fillColor, strokeColor;
        const aya = this.props.attr;
        const verseClass = 'verse';
        const id = `s${aya.sura}-a${aya.index}`;
        const desc = `End of Aya ${aya.index} of Sura ${aya.sura}`;
        if(aya.ruku){
            bgColor = '#d2d9f5';
            fillColor = '#a1c8e5';
            strokeColor = '#19435c';
            rukuSign = <SvgRuku title={`Ruku ${aya.ruku}`}>{toArabicNumber(aya.ruku)}</SvgRuku>
        }

        if(aya.sajda){
            //sajdaSign = <span role="img" title={`${aya.sajda} sajda`}>{'\u06E9'}</span>
            sajdaSign = <SvgSajda title={`${aya.sajda} sajda`} />
        }

        return (
            <span class={verseClass + (aya.sajda ? ' sajda' : '')} id={id}>
                <span class={verseClass + '-text'}>
                    {aya.text}
                </span>
                <span class={verseClass + '-count'}>
                    {sajdaSign}
                    <SvgAya 
                        desc={desc} 
                        strokeColor={strokeColor} 
                        bgColor={bgColor} 
                        fillColor={fillColor}
                    >
                        {toArabicNumber(aya.index)}
                    </SvgAya>
                    {rukuSign}
                </span>
            </span>
        )
    }
}