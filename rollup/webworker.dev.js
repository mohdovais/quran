import config from './base';

export default Object.assign({}, config, {
    input: "src/web-worker/main.js",
    output: {
        file: 'assets/scripts/web-worker.js',
        format: "cjs"
    }
});
