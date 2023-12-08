import { Link } from 'react-router-dom';
import { deleteDB } from 'idb';

import Button from '../components/Button';
import ResetButton from '../components/buttons/ResetButton';
import EditorButton from '../components/buttons/EditorButton';

import { useSolarSystem } from '../lib/hooks';
import storage from '../lib/storage';
import { cn, sleep } from '../lib/helpers';
import { offline, useOffline } from '../lib/state';

const resetOffline = () => {
  offline.ready = false;
  localStorage.removeItem('offline');
};

const resetStorage = async () => {
  await storage.close();
  await deleteDB('solar-system');
};

const resetServiceWorker = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return;

  await Promise.all([
    registration.unregister(),
    (async () => {
      const keys = await caches.keys();
      return Promise.all(keys.map((key) => caches.delete(key)));
    })(),
  ]);
};

const Start = () => {
  const [offline] = useOffline();

  const solarSystem = useSolarSystem();
  const firstPlanet = solarSystem.planets[0];

  return (
    <>
      <div className="p-3 h-full w-full flex">
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border border-neutral-200/50 -mb-10">
          <h1 className="text-5xl font-bold">{solarSystem.title}</h1>
          <div className="flex gap-2 mt-6">
            <ResetButton
              onClick={async () => {
                resetOffline();
                await Promise.all([resetStorage(), resetServiceWorker()]);
                await sleep(250);
                window.location.reload();
              }}
            >
              Reset
            </ResetButton>
            <EditorButton>Editor</EditorButton>
            <Link to={firstPlanet ? `/${solarSystem.id}/${firstPlanet.id}` : '/'}>
              <Button
                shadowClassName="bg-sky-600"
                contentClassName="bg-sky-500 text-white px-4"
                disabled={!firstPlanet}
              >
                Start
              </Button>
            </Link>
          </div>
          <div
            className={cn(
              'flex items-center gap-1 mt-4 transition-opacity',
              offline.ready ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span>Ready for offline use</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
