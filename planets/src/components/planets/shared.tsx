import { Resource, type File, type Moon, type Planet, type Parent } from '../../lib/types';
import { useFiles, usePoints } from '../../lib/state';

export const usePlanet = <P extends Planet>(
  key: string,
): {
  planet: P;
  onRequest: Parent['request'];
  onChange: (id: Moon['id']) => (files: File[], points: number) => void;
} => {
  const [state, set] = useFiles();
  const [, set2] = usePoints();

  return {
    planet: (() => {
      const file = state.files.find((file) => file.key === key);
      return JSON.parse(file?.body || '{}') || {};
    })(),
    onRequest(resource, data) {
      switch (resource) {
        case Resource.Files:
          return set.files.filter((file) => data.includes(file.key));
      }
    },
    onChange: (id) => (files, points) => {
      for (let file of files) set.saveFile(file.key, file.body);
      set2.savePoints(id, points);
    },
  };
};
