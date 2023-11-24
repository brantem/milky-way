import { useAppState } from '../../lib/state';
import { Resource, type File, type Moon, type Planet as _Planet, type Parent } from '../../lib/types';

type PlanetProps<P extends _Planet> = {
  path: string;
  children(data: {
    planet: P;
    onRequest: Parent['request'];
    onChange: (id: Moon['id']) => (files: File[], points: number) => void;
  }): React.ReactNode;
};

export const Planet = <P extends _Planet>({ path, children }: PlanetProps<P>) => {
  const [state, set] = useAppState();

  return children({
    planet: (() => {
      const file = state.files.find((file) => file.key === path);
      return JSON.parse(file?.body || '{}') || {};
    })(),
    onRequest: (resource, data) => {
      switch (resource) {
        case Resource.Files:
          return set.files.filter((file) => data.includes(file.key));
      }
    },
    onChange: (id) => (files, points) => {
      for (let file of files) set.saveFile(file.key, file.body);
      set.savePoints(id, points);
    },
  });
};
