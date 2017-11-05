export default function(_str){
    const str = String(_str);
    return str.charAt(0).toUpperCase() + str.substring(1);
}
