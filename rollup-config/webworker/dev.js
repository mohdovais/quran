import babel from "rollup-plugin-babel";
import globals from "rollup-plugin-node-globals";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: "src/web-worker/main.js",
    output: {
        file: "assets/scripts/web-worker.js",
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
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        resolve({
            browser: true,
            main: true,
            self: true
        })
    ],
    sourcemap: true
}
