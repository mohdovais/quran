import {h, Component} from 'preact';

export default class extends Component{
    render(){
        const props = this.props;
        return (
            <svg
                viewBox="0 0 99 147"
                role="img"
                aria-labelledby="title"
                class={props.className}
                width={props.width}
                height={props.height}
            >
                <title>{props.title}</title>
                <path d="M99.229 147.305H0l20.04-22.94v-51.68L0 49.923 49.57 0 99.23 49.922l-20.04 22.764v51.68l20.04 22.939zm-6.856-97.383L49.57 6.855 6.855 49.922l18.457 20.83v55.547L11.25 142.383h76.729l-14.063-16.084V70.752l18.457-20.83zm-9.316 0l-13.184 15.03v70.839H29.355v-70.84l-13.183-15.03L49.57 16.437l33.487 33.486zm-6.416 0l-27.07-27.07-26.983 27.07 11.074 12.305v68.73h31.904v-68.73l11.075-12.305zm-7.823 0l-7.734 8.525v65.39h-22.94v-65.39l-7.734-8.525 19.16-19.6 19.248 19.6zm-4.658 0L49.57 34.98 35.068 49.922l6.504 7.119v63.105h15.996V57.041l6.592-7.12z" />
            </svg>
        )
    }
}
