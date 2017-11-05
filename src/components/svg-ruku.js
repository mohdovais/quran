import {h, Component} from 'preact';

export default class extends Component{
    render(){
        const props = this.props;
        return (
            <svg 
                viewBox="0 0 1250 1625" 
                role="img" 
                aria-labelledby="title" 
                class={props.className} 
                width={props.width} 
                height={props.height}
            >
                <title>{props.title}</title>
                <path fill="#19435c" d="M1002.612 1402.795L752.454 1567.92q-205.664 0-318.384-16.81-194.788-28.673-300.586-114.696Q0 1328.638 0 1126.929q0-122.608 37.573-220.496 30.652-80.09 88-151.282 27.686-33.618 96.9-101.843-94.922-47.46-131.506-82.068-81.08-76.135-81.08-192.81 0-104.81 88.001-205.664Q198.743 57.08 342.114 57.08q64.27 0 136.45 37.573 48.45 24.72 121.62 82.068-96.9 0-198.744 12.854-131.506 16.81-212.585 48.45-98.877 38.562-98.877 94.922 0 60.315 113.709 114.697 95.91 45.483 217.529 64.27 98.877-53.393 192.81-90.967 104.81-41.528 217.53-69.214l-41.53 154.248q-205.663 80.09-296.63 122.608-183.911 87.012-281.8 177.978-125.573 116.675-125.573 250.16 0 139.416 104.81 219.506 90.966 69.214 267.956 97.888 140.405 22.742 357.935 22.742 46.472 0 92.944-.989l92.944-1.978v8.9z"/>
                <text x="500" y="1200" font-size="700" text-anchor="middle">{props.children[0]}</text>
            </svg>
        )
    }
}