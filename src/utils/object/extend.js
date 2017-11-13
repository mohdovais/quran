export default function(){
    const args = Array.prototype.slice.call(arguments);
    return Object.assign.apply(null, [{}].concat(args));
}
