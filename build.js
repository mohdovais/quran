// Node v8.9.1
const exec = require('child_process').execSync;
const fs = require('fs');
const minify = require('html-minifier').minify;

const FgGreenColor = "\x1b[32m";
const ResetColor = "\x1b[0m";
const FgYellowColor = "\x1b[33m";

function logBuild(msg){
    console.log(`${FgGreenColor}[building]${ResetColor} ${msg}`);
}

console.log(`${FgYellowColor}======================================================${ResetColor}`);

logBuild('app.appcache');
fs.readFile('src/appcache.txt', 'utf8', (err, data) => {
    if (err) throw err;
    var dateString = (new Date()).toString();
    fs.writeFileSync('app.appcache', `CACHE MANIFEST\n# ${dateString}\n${data}`, 'utf8');
});

logBuild('index.html');
fs.readFile('src/index.html', 'utf8', (err, data) => {
    if (err) throw err;
    fs.writeFileSync('index.html', minify(data, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
    }), 'utf8');
});

exec('rollup -c');
exec('rollup -c --environment prod');
