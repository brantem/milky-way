import { createContext, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';

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
    initial?: {
      file?: string;
    };
    output?: {
      file?: string;
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
  const initial = useMemo(() => {
    const obj = {
      leftIds: data.left.items.map((item) => item.id),
      rightIds: data.right.items.map((item) => item.id),
      lines: [],
    };
    if (data.left.shuffle) obj.leftIds = shuffle(obj.leftIds);
    if (data.right.shuffle) obj.rightIds = shuffle(obj.rightIds);

    const keys = [];
    if (data.initial?.file) keys.push(data.initial.file);
    if (data.output?.file) keys.push(data.output.file);
    if (!keys.length) return obj;

    const [initial, output] = parent.request(Resource.Files, keys);
    const body = JSON.parse((output || initial)?.body || '{}') || {};
    if ('leftIds' in body) obj.leftIds = body.leftIds;
    if ('rightIds' in body) obj.rightIds = body.rightIds;
    if ('lines' in body) obj.lines = body.lines.map((line: Line) => ({ a: `${id}-${line.a}`, b: `${id}-${line.b}` }));

    return obj;
  }, [data.initial?.file, data.output?.file, data.left, data.right]);

  const [lines, setLines] = useState<State['lines']>(() => initial.lines);
  const [a, setA] = useState<State['a']>(null);
  const [b, setB] = useState<State['b']>(null);

  const snapshot: ProviderHandle['snapshot'] = () => {
    const points = lines.reduce((points, line) => {
      return line.a.split('-')[1] === line.b.split('-')[1] ? ++points : points;
    }, 0);
    return {
      files: data.output?.file
        ? [
            {
              key: data.output.file,
              body: JSON.stringify({
                leftIds: initial.leftIds,
                rightIds: initial.rightIds,
                lines: lines.map((line) => ({
                  a: line.a.replace(`${id}-`, ''),
                  b: line.b.replace(`${id}-`, ''),
                })),
              }),
            },
          ]
        : [],
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

  useEffect(() => {
    const { files, points } = snapshot();
    onChange(files, points);
  }, [lines]);

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
        leftIds: initial.leftIds,
        rightIds: initial.rightIds,

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
        },

        isConnected,
      }}
    >
      {children}
    </IoContext.Provider>
  );
});

export const useIo = () => useContext(IoContext);
