import Markdown from './components/Markdown';

import type { File } from './lib/types';

import './index.css';

type DeimosProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  files: File[];
  data: {
    file: string;
  };
  onPublish(action: string, data?: any): void;
};

type Item = {
  text: string;
  data: Record<string, any>;
};

type Item2 = Record<string, any>;

const Deimos = ({ width = '100%', height = '100%', files, data, onPublish }: DeimosProps) => {
  const items = (JSON.parse(files.find((file) => file.key === data.file)?.body || '[]') || []) as Item[];
  const items2 = (JSON.parse(files.find((file) => file.key === 'outputs/deimos.json')?.body || '[]') || []) as Item2[];

  const check = (index: number): [isCompleted: boolean, isFailed: boolean] => {
    const item = items[index];
    const item2 = items2[index];
    if (!item2) return [false, false];
    const keys = Object.keys(item.data);
    if (keys.every((key) => item.data[key] === item2[key])) return [true, false];
    return [false, true];
  };

  return (
    <div id="deimos" style={{ width, height }}>
      <div className="h-full w-full overflow-y-auto bg-yellow-50/50 font-sans">
        <ol className="list-none overflow-hidden m-0 p-0">
          {items.map((item, i) => {
            const [isCompleted, isFailed] = check(i);
            return (
              <li
                key={i}
                className={[
                  'relative py-2 px-3 min-h-[theme(spacing.16)] overflow-hidden border-0 border-b border-solid',
                  isCompleted
                    ? 'border-b-lime-900/10 bg-lime-50/50'
                    : isFailed
                    ? 'border-b-rose-900/10 bg-rose-50/50'
                    : 'border-b-yellow-900/10',
                ].join(' ')}
              >
                <span
                  className={[
                    'text-[6.25rem] font-extrabold absolute -top-5 -left-2 leading-none italic select-none',
                    isCompleted ? 'text-lime-200/75' : isFailed ? 'text-rose-200/75' : 'text-yellow-200/75',
                  ].join(' ')}
                >
                  {i + 1}
                </span>
                <Markdown
                  className={isCompleted ? 'text-lime-900' : isFailed ? 'text-rose-900' : 'text-yellow-900'}
                  onPublish={onPublish}
                >
                  {item.text}
                </Markdown>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Deimos;
