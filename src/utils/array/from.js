export default function(obj){
    if(Object.prototype.toString.call(obj) === '[object Array]'){
        return obj;
    }else if (obj !== null && obj !== undefined){
        return [obj];
    }else{
        return [];
    }
}
