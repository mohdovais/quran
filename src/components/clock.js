import {
    h,
    Component
} from './../../node_modules/preact/src/preact';

export default class Clock extends Component {
    
        constructor() {
            super();
            // set initial time:
            this.state.time = Date.now();
        }
    
        // before the component gets mounted to the DOM
        componentWillMount() {
    
        }
        // after the component gets mounted to the DOM
        componentDidMount() {
            // update time every second
            this.timer = setInterval(() => {
                this.setState({
                    time: Date.now()
                });
            }, 1000);
        }
    
        // before new props get accepted
        componentWillReceiveProps() {
    
        }
        // before render(). Return false to skip render
        shouldComponentUpdate() {
    
        }
        // before render()
        componentWillUpdate() {
    
        }
    
        render() {
            let time = new Date().toLocaleTimeString();
            return <span>{time}</span>;
        }
    
        // 	after render()
        componentDidUpdate() {
    
        }
    
        // prior to removal from the DOM
        componentWillUnmount() {
            // stop when not renderable
            clearInterval(this.timer);
        }
    
    }