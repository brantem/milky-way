import { createContext, forwardRef, useContext, useImperativeHandle, useMemo, useState } from 'react';

import { Action, Resource, type File, type Item, type Coordinate, type Line } from './types';
import { shuffle } from './helpers';

type State = {
  _id: string;
  leftIds: string[];
  rightIds: string[];

  a: string | null;
  start(id: string): void;
  b: (string | Coordinate) | null;
  setB(b: string | Coordinate): void;

  lines: Line[];
  visibleLines: Line[];
  addLine(): void;

  isConnected(id: string): boolean;
};

export const IoContext = createContext<State>({
  _id: '',
  leftIds: [],
  rightIds: [],

  a: null,
  start() {},
  b: null,
  setB() {},

  lines: [],
  visibleLines: [],
  addLine() {},

  isConnected() {
    return false;
  },
});

export type ProviderHandle = {
  snapshot(): { files: File[]; points: number };
  execute(action: Action.Reset): boolean;
};

export type ProviderProps = {
  parent: {
    id: string;
    request: (resource: Resource.Files, keys: string[]) => (File | undefined)[];
  };
  id: string;
  data: {
    initial: {
      file: string;
    };
    output: {
      file: string;
    };
    left: {
      items: Item[];
      shuffle?: boolean;
    };
    right: {
      items: Item[];
      shuffle?: boolean;
    };
  };
  onChange(files: File[], points: number): void;
  children: React.ReactNode;
};

export const Provider = forwardRef<ProviderHandle, ProviderProps>(({ parent, id, data, children, onChange }, ref) => {
  const { leftIds, rightIds, initialLines } = useMemo(() => {
    const [file] = parent.request(Resource.Files, [data.initial.file]);
    if (file) {
      type Body = Pick<State, 'leftIds' | 'rightIds' | 'lines'>;
      const { leftIds, rightIds, lines } = (JSON.parse(file?.body || '{}') || {}) as Body;
      return { leftIds, rightIds, initialLines: lines.map((line) => ({ a: `${id}-${line.a}`, b: `${id}-${line.b}` })) };
    } else {
      let leftIds = data.left.items.map((item) => item.id);
      if (data.left.shuffle) leftIds = shuffle(leftIds);

      let rightIds = data.right.items.map((item) => item.id);
      if (data.right.shuffle) rightIds = shuffle(rightIds);

      return { leftIds, rightIds, initialLines: [] };
    }
  }, [data.initial.file, data.left, data.right]);

  const [lines, setLines] = useState(() => initialLines);
  const [a, setA] = useState<State['a']>(null);
  const [b, setB] = useState<State['b']>(null);

  const snapshot: ProviderHandle['snapshot'] = () => {
    const points = lines.reduce((points, line) => {
      return line.a.split('-')[1] === line.b.split('-')[1] ? ++points : points;
    }, 0);
    return {
      files: [
        {
          key: data.output.file,
          body: JSON.stringify({
            leftIds,
            rightIds,
            lines: lines.map((line) => ({
              a: line.a.replace(`${id}-`, ''),
              b: line.b.replace(`${id}-`, ''),
            })),
          }),
        },
      ],
      points,
    };
  };

  useImperativeHandle(ref, () => ({
    snapshot,
    execute(action) {
      switch (action) {
        case Action.Reset:
          setLines([]);
          return true;
        default:
          return false;
      }
    },
  }));

  const visibleLines = (() => {
    if (!a) return lines;
    return lines.filter((line) => line.a !== a && line.b !== a);
  })();

  const isConnected: State['isConnected'] = (id) => {
    return visibleLines.findIndex((line) => line.a === id || line.b === id) !== -1;
  };

  return (
    <IoContext.Provider
      value={{
        _id: id,
        leftIds,
        rightIds,

        a,
        start(id) {
          if (a) return;
          const index = lines.findIndex((line) => line.a === id || line.b === id);
          if (index !== -1) {
            const line = lines[index];
            setA(line.a === id ? line.b : line.a);
            setB(id);
          } else {
            setA(id);
          }
        },
        b,
        setB,

        lines,
        visibleLines,
        addLine() {
          if (!a || !b) return;
          if (typeof b === 'string') {
            const id = b;
            if (isConnected(id)) return;
            setLines([...visibleLines, { a, b: id }]);
          }
          setA(null);
          setB(null);
          const { files, points } = snapshot();
          onChange(files, points);
        },

        isConnected,
      }}
    >
      {children}
    </IoContext.Provider>
  );
});

export const useIo = () => useContext(IoContext);
