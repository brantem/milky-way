import { cacheNames, clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { RangeRequestsPlugin } from 'workbox-range-requests';

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(({ request, url }) => {
  if (request.mode !== 'navigate') return false;
  if (url.pathname.startsWith('/_')) return false;
  if (url.pathname.match(fileExtensionRegexp)) return false;
  return true;
}, createHandlerBoundToURL('/index.html'));

self.addEventListener('message', (event) => {
  switch (event.data.action) {
    case 'cache':
      if (!event.data.urls.length) break;

      event.waitUntil(
        caches.open(cacheNames.runtime).then((cache) => {
          cache.addAll(event.data.urls).then(() => {
            event.source?.postMessage({ action: 'cache', success: true });
          });
        }),
      );
  }
});

registerRoute(
  () => true,
  new StaleWhileRevalidate({
    cacheName: cacheNames.runtime,
    plugins: [new RangeRequestsPlugin()],
  }),
);
