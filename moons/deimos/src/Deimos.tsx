import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import Markdown from './components/Markdown';

import { Action, Resource, type File } from './lib/types';

import './index.css';

export type DeimosHandle = {
  execute(action: Action): Promise<boolean>;
};

type DeimosProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  parent: {
    id: string;
    request(resource: Resource.Files, keys: string[]): Promise<(File | null)[]>;
  };
  id: string;
  data: {
    tasks: {
      file: string;
      output?: string;
    };
  };
  onPublish(action: Action.SetColor, color: string): void;
};

type Item = {
  text: string;
  data: Record<string, unknown>;
};

type Item2 = Record<string, unknown>;

const Deimos = forwardRef<DeimosHandle, DeimosProps>(
  ({ width = '100%', height = '100%', parent, id, data, onPublish }, ref) => {
    const [items, setItems] = useState<Item[]>([]);
    const [values, setValues] = useState<(boolean | null)[]>([]);

    const refresh = (a: Item[], b: Item2[]) => {
      const values = a.map((item, i) => {
        const item2 = b[i];
        if (!item2) return null;
        return Object.keys(item.data).every((key) => {
          return item.data[key] === item2[key];
        });
      });
      setValues(values);
    };

    useImperativeHandle(ref, () => ({
      async execute(action) {
        switch (action) {
          case Action.Refresh: {
            if (!data.tasks?.output) return true;
            const [file] = await parent.request(Resource.Files, [data.tasks.output]);
            refresh(items, JSON.parse(file?.body || '[]') || []);
            return true;
          }
          default:
            return false;
        }
      },
    }));

    useEffect(() => {
      (async () => {
        const keys = [data.tasks.file];
        if (data.tasks?.output) keys.push(data.tasks.output);
        const [file, output] = await parent.request(Resource.Files, keys);
        const items = JSON.parse(file?.body || '[]') || [];
        if (items.length) setItems(items);
        if (output) refresh(items, JSON.parse(output.body || '[]') || []);
      })();
    }, [data.tasks]);

    return (
      <div id={`deimos-${id}`} style={{ width, height }}>
        <div className="h-full w-full overflow-y-auto bg-yellow-50/50 font-sans">
          <ol className="list-none overflow-hidden m-0 p-0">
            {items.map((item, i) => {
              return (
                <li
                  key={i}
                  className={[
                    'relative py-2 px-3 min-h-[theme(spacing.16)] overflow-hidden border-0 border-b border-solid',
                    values[i] === true
                      ? 'border-b-lime-900/10 bg-lime-50/50 text-lime-900'
                      : values[i] === false
                        ? 'border-b-rose-900/10 bg-rose-50/50 text-rose-900'
                        : 'border-b-yellow-900/10 text-yellow-900',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'text-[6.25rem] font-extrabold absolute -top-5 -left-2 leading-none italic select-none',
                      values[i] === true
                        ? 'text-lime-200/75'
                        : values[i] === false
                          ? 'text-rose-200/75'
                          : 'text-yellow-200/75',
                    ].join(' ')}
                  >
                    {i + 1}
                  </span>
                  <Markdown onPublish={onPublish}>{item.text}</Markdown>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  },
);

export default Deimos;
