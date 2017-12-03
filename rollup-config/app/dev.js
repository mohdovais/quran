import babel from "rollup-plugin-babel";
import globals from "rollup-plugin-node-globals";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
    input: "src/main.js",
    output: {
        file: "assets/scripts/app.js",
        format: "iife"
    },
    plugins: [
        postcss({
            extensions: ['.css'],
        }),
        babel({
            babelrc: false,
            exclude: "node_modules/**",
            presets: [
                ["env", {
                    "targets": {
                        "browsers": ["last 2 versions", "ie >= 9"]
                    },
                    "modules": false
                }],
                "stage-0"
            ],
            plugins: [
                "external-helpers",
                ["transform-react-jsx", {
                    "pragma": "h"
                }]
            ]
        }),
        commonjs(),
        globals(),
        replace({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        resolve({
            browser: true,
            main: true
        })
    ],
    sourcemap: true
}
