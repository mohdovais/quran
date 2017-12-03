var check = function (object1, object2) {
    var key;

    for (key in object1) {
        if (Object.prototype.hasOwnProperty.call(object1, key)) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }
    }
    return true;
};

export default function (object1, object2) {

    // Short circuit if the same object is passed twice
    if (object1 === object2) {
        return true;
    }
    if (object1 && object2) {
        // Do the second check because we could have extra keys in
        // object2 that don't exist in object1.
        return check(object1, object2) && check(object2, object1);
    } else if (!object1 && !object2) {
        return object1 === object2;
    } else {
        return false;
    }
}
