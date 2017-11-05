import {h, Component} from 'preact';
import Header from './header';
import Content from './content';
import Footer from './next-back';

export default class App extends Component{
    render(){
        const store = this.props.store;
        return (
            <section hidden>
                <Header store={store} />
                <Content store={store} />
                <Footer store={store} /> 
            </section>
        );
    }

}
