import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('message', (event) => {
  switch (event.data.action) {
    case 'cache':
      if (!event.data.urls.length) break;
      event.waitUntil(caches.open(event.data.name).then((cache) => cache.addAll(event.data.urls)));
  }
});
