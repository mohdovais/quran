// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from 'rollup-plugin-babel';
import replace from "rollup-plugin-replace";

const build = "production";

export default {
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(build)
          }),
        resolve(),
        babel({
            exclude: 'node_modules/**',
            babelrc: false,
            presets: [
                ["@babel/env", {
                    "modules": false
                }]
            ],
            plugins: [
                ["@babel/transform-react-jsx", {
                    "pragma": "h"
                }]
            ]
        })
    ]
};
