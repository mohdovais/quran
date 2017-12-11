function getRegExp(className) {
    return new RegExp(`(\\s?\\b${className}\\b\\s?)`, 'g');
}

function getClassNames(classNames){
    return classNames.split(' ').filter(function (item) {
        return item !== ''
    });
}

function doAddCssClass(className) {
    var regexp = getRegExp(className);
    var domClassName = this.className;

    if (!regexp.test(domClassName)) {
        this.className += ` ${className}`;
    }
}

function doRemoveCssClass(className){
    this.className = this.className.replace(getRegExp(className), ' ').trim();
}

export function addCssClass(dom, classNames) {
    getClassNames(classNames).forEach(doAddCssClass, dom);
}

export function removeCssClass(dom, classNames) {
    getClassNames(classNames).forEach(doRemoveCssClass, dom);
}
