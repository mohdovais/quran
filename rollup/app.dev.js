// rollup.config.js
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import config from './base';

export default Object.assign({}, config, {
    input: 'src/main.js',
    output: {
        file: 'assets/scripts/app.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        postcss({
            minimize: true,
            plugins: [autoprefixer]
        })
    ].concat(config.plugins)
});
