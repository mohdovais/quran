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
        this.state.sura = {
            ayas: []
        };
    }

    componentDidMount(){
        const me = this;
        me.setState({
            ayas: []
        });
        window.requestAnimationFrame(me.stepState.bind(me));
    }

    // before new props get accepted of already rendered
    componentWillReceiveProps() {
        this.componentDidMount();
    }

    render(props, state){
        const me = this;
        const sura = props.data;
        return (
            <article lang="ar">
                {me.getHeader(sura)}
                {me.getVerse(sura.ayas)}
            </article>
        )
    }

    getHeader(sura){
        let h2, h3, h4;
        const firstAya = sura.ayas[0];

        if(!firstAya){
            return;
        }

        const svgTitle = `assets/images/sura-title/${firstAya.sura}.svg`;
        const altTitle = `${SURA_AR} ${sura.name}`;

        if(firstAya.index === 1){
            h2 = (<h2><img src={svgTitle} alt={altTitle} /></h2>);
            h3 = (<h3>{sura.tname} | {sura.ename} | {sura.type}</h3>);
        }

        if(firstAya.bismillah || firstAya.sura === 1){
            h4 = <SvgBismillah fill='#19435C' desc={BISMILLAH_AR} className='bismillah' />
        }

        return (<header>{h2}{h3}{h4}</header>)
    }

    getVerse(verse){
        return verse.reduce(function(accum, aya){
            return aya.sura === 1 && aya.index === 1 ? accum : accum.concat(<Aya attr={aya} />);
        }, []);
    }

    stepState(){
        const me = this;
        const count = me.state.ayas.length + 50;
        const ayas = me.props.data.ayas || [];
        me.setState(function(state, props){
            return Object.assign({}, state, {
                ayas: ayas.slice(0, count)
            });
        });

        if(count < ayas.length){
            window.requestAnimationFrame(me.stepState.bind(me));
        }
    }
}
