import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";

export default {
    input: "src/service-worker/main.js",
    output: {
        file: "./service-worker.js",
        format: "es"
    },
    plugins: [
        replace({
            "VERSION": JSON.stringify(Date.now())
        }),
        resolve({
            browser: true,
            main: true,
            self: true
        })
    ]
};
