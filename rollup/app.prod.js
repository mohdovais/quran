// rollup.config.js
import uglify from 'rollup-plugin-uglify';
import config from './app.dev';

export default Object.assign({}, config, {
    output: {
        file: 'assets/scripts/app.min.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: config.plugins.concat([uglify()])
});
