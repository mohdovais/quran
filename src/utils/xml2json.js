export default function xml2json(xml) {

    var i, j, l, item, nodeName, attribute, old;

    // Create the return object
    var obj = Object.create(null);

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            for (j = 0, l = xml.attributes.length; j < l; j++) {
                attribute = xml.attributes.item(j);
                obj[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = Number(xml.nodeValue) || xml.nodeValue;
    }

    // loop children
    if (xml.hasChildNodes()) {
        l = xml.childNodes.length;
        // If just one text node inside
        if (l === 1 && xml.childNodes[0].nodeType === 3) {
            obj = xml.childNodes[0].nodeValue;
        } else {
            for (i = 0; i < l; i++) {
                item = xml.childNodes.item(i);
                // ignore white space
                if (item.nodeType === 3) {
                    continue;
                }
                nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xml2json(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                }
            }
        }
    }

    i = j = l = item = nodeName = attribute = old = null;
    return obj;
}