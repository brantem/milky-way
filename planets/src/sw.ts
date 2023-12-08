import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

// import { ROOT_FOLDER, MOONS_FILES } from './lib/constants';

// TODO: can't access localstorage here
// console.log(files.value.find((file) => file.key === ROOT_FOLDER + MOONS_FILES));

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
