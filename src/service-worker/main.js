import onInstall from './install';
import onActivate from './activate';
import onFetch from './fetch';

self.CACHE_NAME = "VERSION";

self.urlsToCache = [
  'index.html',
  'assets/scripts/app.min.js',
  'assets/scripts/web-worker.js',
  'assets/data/quran-simple.txt'
];

// INSTALL
self.addEventListener('install', onInstall.bind(self));

// ACTIVATE
self.addEventListener('activate', onActivate.bind(self));

// FETCH
self.addEventListener('fetch', onFetch.bind(self));
