import babel from "rollup-plugin-babel";
import globals from "rollup-plugin-node-globals";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify';

const build  = process.env.prod || process.env.production ? 'production' : 'development';
const min = build === 'production' ? '.min' : '';

export default [
    /* Applicatiin */
    {
        input: "src/main.js",
        output: {
            file: `assets/scripts/app${min}.js`,
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
                    "external-helpers", ["transform-react-jsx", {
                        "pragma": "h"
                    }]
                ]
            }),
            commonjs(),
            globals(),
            replace({
                "process.env.NODE_ENV": JSON.stringify(build)
            }),
            resolve({
                browser: true,
                main: true
            }),
            (build === 'production' && uglify())
        ],
        sourcemap: build === 'production'
    },

    /* Service Worker */
    {
        input: "src/service-worker/main.js",
        output: {
            file: "service-worker.js",
            format: "es"
        },
        gloabls: {
            self: "self"
        },
        plugins: [
            replace({
                "process.env.NODE_ENV": JSON.stringify(build),
                "VERSION": JSON.stringify(Date.now())
            }),
            resolve({
                browser: true,
                main: true,
                self: true
            }),
            (build === 'production' && uglify())
        ]
    },

    /* Web Worker */
    {
        input: "src/web-worker/main.js",
        output: {
            file: `assets/scripts/web-worker${min}.js`,
            format: "iife"
        },
        gloabls: {
            self: "self"
        },
        plugins: [
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
                    "external-helpers"
                ]
            }),
            commonjs(),
            globals(),
            replace({
                "process.env.NODE_ENV": JSON.stringify(build)
            }),
            resolve({
                browser: true,
                main: true,
                self: true
            }),
            (build === 'production' && uglify())
        ],
        sourcemap: build === 'production'
    }
]
