export function getSelectWidth(text) {
    var doc = document;
    var body = doc.body;
    var select = doc.createElement('select');
    var option = doc.createElement('option');
    var width;

    option.text = text;
    select.add(option, null);
    select.style.opacity = 0;
    body.appendChild(select);
    width = select.scrollWidth;
    body.removeChild(select);

    return width;
}

export default function resizeSelect(select){
    var selected = select && select.options[select.selectedIndex];
    if(selected){
        select.style.width = getSelectWidth(selected.innerText) + 'px';
    }
}
