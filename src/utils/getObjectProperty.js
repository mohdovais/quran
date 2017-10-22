export default function getObjectProperty(obj, property) {
    return property.split('.').reduce(function (acc, prop) {
        return acc && acc[prop];
    }, obj);
}