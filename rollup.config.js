// rollup.config.js
import app from './rollup/app.prod';
import webworker from './rollup/webworker.dev';
import serviceworker from './rollup/sw';

export default [app, webworker, serviceworker];
