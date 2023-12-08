import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { offline } from '../lib/state';
import storage from '../lib/storage';

const getUrlsToCache = async (root: string) => {
  const body = await storage.get('files', `${root}/_cache.json`);
  return JSON.parse(body || '[]') as string[];
};

const Offline = () => {
  const params = useParams() as { solarSystem: string };

  useEffect(() => {
    (async () => {
      await navigator.serviceWorker.ready;
      const urls = await getUrlsToCache(params.solarSystem);
      navigator.serviceWorker.controller?.postMessage({ action: 'cache', name: params.solarSystem, urls });
    })();

    navigator.serviceWorker.addEventListener('message', (event) => {
      switch (event.data.action) {
        case 'cache':
          if (!event.data.success) break;
          offline.ready = true;
          localStorage.setItem('offline', '1');
          break;
      }
    });
  }, []);

  return null;
};

export default Offline;
