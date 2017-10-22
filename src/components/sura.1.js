import {
    h,
    Component
} from 'preact';

import Aya from './aya';
import {SURA_AR} from '../constants'

export default class Sura extends Component{

    constructor() {
        super();
        this.state.lastCount = 0;
    }

    componentDidMount(){
        var props = this.props;
    }

    // before new props get accepted of already rendered
    componentWillReceiveProps() {
        console.log('before new props get accepted')
    }

    shouldComponentUpdate(){
        //return false
    }

    render(props, state){
        const header = this.getHeader(props.data[0], props.meta);
        const verse = this.getVerse(props.data);
        return (
            <article lang="ar">
                {header}
                {verse}
            </article>
        )
    }

    getHeader(first, meta){
        let h2;
        let h3;
        let h4;
        let title = first.sura === undefined ? {} : meta.suras.sura[first.sura - 1];
        const svgTitle = `assets/images/sura-title/${first.sura}.svg`;
        const altTitle = `${SURA_AR} ${title.name}`;

        if(first.index === 1){
            h2 = (<h2><img src={svgTitle} alt={altTitle} /></h2>);
            h3 = (<h3>{title.tname} | {title.ename} | {title.type}</h3>);
        }

        if(first.bismillah){
            h4 = (<h4><img src="assets/images/bismillah.svg" alt={first.bismillah} /></h4>);
        }

        return (<header>{h2}{h3}{h4}</header>)
    }

    getVerse(verse){
        return verse.slice().reduce(function(accum, aya, index){
            accum.push(<Aya attr={aya} />);
            return accum;
        }, []);
    }
}