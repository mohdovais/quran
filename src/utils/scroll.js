import {addCssClass, removeCssClass} from './dom/css-class';

var lastScrollY = 0;
var flag = false;
var timeout;
var scrolling = false;
const body = document.body;

function onScrollStart(event){
    scrolling = true;
    addCssClass(body, 'scrolling');
    console.log('scrollstart');
}

function onScrolling(newPageY, oldPageY) {
    const direction = newPageY > oldPageY ? 'down' : 'up';
    console.log('scrolling', direction)
}

function onScrollEnd(event) {
    scrolling = false;
    removeCssClass(body, 'scrolling');
    console.log('scrollend');

}

function onScroll(event) {

    if (!scrolling) {
        onScrollStart();
    }

    clearTimeout(timeout);
    timeout = setTimeout(onScrollEnd, 100, event);

    if (!flag) {
        const pageY = event.pageY;
        window.requestAnimationFrame(function () {
            onScrolling(pageY, lastScrollY);
            lastScrollY = pageY;
            flag = false;
        });
        flag = true;
    }
}

window.addEventListener('scroll', onScroll, false);

//document.addEventListener("touchmove", ScrollStart, false);

export default null;
