import config from './base';
import uglify from 'rollup-plugin-uglify';

export default Object.assign({}, config, {
    input: "src/web-worker/main.js",
    output: {
        file: 'assets/scripts/web-worker.min.js',
        format: "cjs",
        sourcemap: true
    },
    plugins: config.plugins.concat([uglify({
        mangle: {
            toplevel: true
        }
    })])
});
