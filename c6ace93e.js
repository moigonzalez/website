'use strict';

const PREFIX = 'pwaawards.com';
const HASH = 'c6ace93e'; // Computed at build time.
const OFFLINE_CACHE = `${PREFIX}-${HASH}`;

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(OFFLINE_CACHE).then(function(cache) {
			return cache.addAll([
				'/',
				'/favicon.ico',
				'/screen.css',
				'/script.js',
				'/fonts/permanent-marker.woff',
				'/fonts/permanent-marker.woff2',
				'/images/111.png',
				'/images/icon-228x228.png',
				'/images/icon.svg',
				'/images/logos',
				'/apps/basic-calc.svg',
				'/apps/devmind.svg',
				'/apps/etch.svg',
				'/apps/firefox.svg',
				'/apps/flipboard.svg',
				'/apps/flipkart.svg',
				'/apps/googlemaps.svg',
				'/apps/opera.svg',
				'/apps/starbucks.svg',
				'/apps/telegram.svg',
				'/apps/tinder.svg',
				'/apps/Trusting-Trust.svg',
				'/apps/twitter.svg',
				'/apps/uber.svg'
			]); // Computed at build time.
		})
	);
});

self.addEventListener('activate', function(event) {
	// Delete old asset caches.
	event.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(
				keys.map(function(key) {
					if (
						key != OFFLINE_CACHE &&
						key.startsWith(`${PREFIX}-`)
					) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	if (event.request.mode == 'navigate') {
		console.log('Handling fetch event for', event.request.url);
		console.log(event.request);
		event.respondWith(
			fetch(event.request).catch(function(exception) {
				// The `catch` is only triggered if `fetch()` throws an exception,
				// which most likely happens due to the server being unreachable.
				console.error(
					'Fetch failed; returning offline page instead.',
					exception
				);
				return caches.open(OFFLINE_CACHE).then(function(cache) {
					return cache.match('/');
				});
			})
		);
	} else {
		// It’s not a request for an HTML document, but rather for a CSS or SVG
		// file or whatever…
		event.respondWith(
			caches.match(event.request).then(function(response) {
				return response || fetch(event.request);
			})
		);
	}

});
