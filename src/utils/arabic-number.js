////"٠١٢٣٤٥٦٧٨٩"
export default function toArabicNumber(num) {
    return String(num).split('').reduce(function (accumulator, digit) {
        return (accumulator += "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".substr(parseInt(digit), 1));
    }, '');
}