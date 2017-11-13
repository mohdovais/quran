export default function(object, property){
    return Object.prototype.hasOwnProperty.call(object, property)
}
