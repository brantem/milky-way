import { createContext, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';

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
  snapshot(): Promise<{ files: File[]; points: number }>;
  execute(action: Action.Reset): Promise<boolean>;
};

export type ProviderProps = {
  parent: {
    id: string;
    request(resource: Resource.Files, keys: string[]): Promise<(File | null)[]>;
  };
  id: string;
  data: {
    initial?: {
      file?: string;
    };
    output?: {
      file?: string;
      deimos?: string;
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
  const [leftIds, setLeftIds] = useState<State['leftIds']>([]);
  const [rightIds, setRightIds] = useState<State['rightIds']>([]);
  const [a, setA] = useState<State['a']>(null);
  const [b, setB] = useState<State['b']>(null);
  const [lines, setLines] = useState<State['lines']>([]);
  const [isReady, setIsReady] = useState(false);

  const snapshot = () => {
    const points = lines.reduce((points, line) => {
      return line.a.split('-')[2] === line.b.split('-')[2] ? ++points : points;
    }, 0);

    const files = [];
    if (data.output?.file) {
      files.push({
        key: data.output.file,
        body: JSON.stringify({
          leftIds,
          rightIds,
          lines: lines.map((line) => ({
            a: line.a.replace(`${id}-`, ''),
            b: line.b.replace(`${id}-`, ''),
          })),
        }),
      });
    }

    if (data.output?.deimos) files.push({ key: data.output.deimos, body: JSON.stringify({ value: points }) });

    return { files, points };
  };

  useImperativeHandle(ref, () => ({
    async snapshot() {
      return snapshot();
    },
    async execute(action) {
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
    (async () => {
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
      if (keys.length) {
        const [initial, output] = await parent.request(Resource.Files, keys);
        const body = JSON.parse((output || initial)?.body || '{}') || {};
        if ('leftIds' in body) obj.leftIds = body.leftIds;
        if ('rightIds' in body) obj.rightIds = body.rightIds;
        if ('lines' in body) obj.lines = body.lines.map((l: Line) => ({ a: `${id}-${l.a}`, b: `${id}-${l.b}` }));
      }

      setLeftIds(obj.leftIds);
      setRightIds(obj.rightIds);
      setLines(obj.lines);
      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!isReady) return;
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
        },

        isConnected,
      }}
    >
      {children}
    </IoContext.Provider>
  );
});

export const useIo = () => useContext(IoContext);
