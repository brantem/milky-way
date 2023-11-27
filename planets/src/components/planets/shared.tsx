import { Resource, type File, type Moon, type Planet, type Parent } from '../../lib/types';
import { files, points } from '../../lib/state';

export const usePlanet = <P extends Planet>(
  key: string,
): {
  planet: P;
  onRequest: Parent['request'];
  onChange: (id: Moon['id']) => (files: File[], points: number) => void;
} => {
  return {
    planet: (() => {
      const file = files.value.find((file) => file.key === key);
      return JSON.parse(file?.body || '{}') || {};
    })(),
    onRequest(resource, data) {
      switch (resource) {
        case Resource.Files:
          return files.value.filter((file) => data.includes(file.key));
      }
    },
    onChange: (id) => (_files, _points) => {
      for (let file of _files) files.save(file.key, file.body);
      points.save(id, _points);
    },
  };
};
