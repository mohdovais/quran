export function gotoIndex(index){
    return {
        type: 'GOTO_INDEX',
        data: {
            index
        }
    }
}
