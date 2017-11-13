export default function (obj, property) {
    return property.split('.').reduce(function (acc, prop) {
        return acc && acc[prop];
    }, obj);
}
