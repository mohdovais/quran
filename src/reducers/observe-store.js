export default function observeStore(store, reducer, callback) {
    let currentState;

    function handleChange() {
        let nextState = reducer(store, currentState);
        if (nextState !== currentState) {
            currentState = nextState;
            callback(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}
