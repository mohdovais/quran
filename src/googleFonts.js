export default function (fontFamily) {
    var nodeType = "link",
        existingNode = document.getElementsByTagName(nodeType)[0],
        node = document.createElement(nodeType);

    node.rel = 'stylesheet';
    node.href = 'https://fonts.googleapis.com/css?family=' + fontFamily;
    node.type = 'text/css';
    existingNode.parentNode.insertBefore(node, existingNode);
}
