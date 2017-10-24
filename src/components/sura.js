import {
    h,
    Component
} from 'preact';

import Aya from './aya';
import {SURA_AR, BISMILLAH_AR} from '../constants';
import SvgBismillah from './svg-bismillah';

export default class Sura extends Component{

    constructor() {
        super();
        this.state.verse = [];
    }

    componentDidMount(){
        const me = this;
        me.setState({
            verse: []
        });
        window.requestAnimationFrame(me.stepState.bind(me));
    }

    // before new props get accepted of already rendered
    componentWillReceiveProps() {
        this.componentDidMount();
    }

    render(props, state){
        const me = this;
        return (
            <article lang="ar">
                {me.getHeader(me.state.verse[0], me.props.meta)}
                {me.getVerse(me.state.verse)}
            </article>
        )
    }

    getHeader(firstAya, meta){

        if(!firstAya){
            return;
        }

        let h2;
        let h3;
        let h4;
        let title = firstAya.sura === undefined ? {} : meta.suras.sura[firstAya.sura - 1];
        const svgTitle = `assets/images/sura-title/${firstAya.sura}.svg`;
        const altTitle = `${SURA_AR} ${title.name}`;

        if(firstAya.index === 1){
            h2 = (<h2><img src={svgTitle} alt={altTitle} /></h2>);
            h3 = (<h3>{title.tname} | {title.ename} | {title.type}</h3>);
        }

        if(firstAya.bismillah || firstAya.sura === 1){
            h4 = <SvgBismillah fill='#19435C' desc={BISMILLAH_AR} className='bismillah' />
        }

        return (<header>{h2}{h3}{h4}</header>)
    }

    getVerse(verse){
        return verse.reduce(function(accum, aya, index){
            return aya.sura === 1 && aya.index === 1 ? accum : accum.concat(<Aya attr={aya} />);
        }, []);
    }

    stepState(){
        const me = this;
        const count = me.state.verse.length + 50;
        const data = me.props.data || [];
        me.setState({
            verse: data.slice(0, count)
        });

        if(count < data.length){
            window.requestAnimationFrame(me.stepState.bind(me));
        }
    }
}