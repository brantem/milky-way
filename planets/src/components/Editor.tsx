import { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useParams, useRevalidator } from 'react-router-dom';

import Button from './Button';

import type { File } from '../types';
import { useEditor, points } from '../lib/state';
import { cn, sleep, prettifyJSON, uglifyJSON } from '../lib/helpers';
import storage from '../lib/storage';
import { useFiles, useSolarSystem } from '../lib/hooks';

const SUPPORTED_EXTENSIONS = ['.json', '.md', '.txt'];

type AddFileProps = {
  onFileCreate(key: string): Promise<void>;
};

const AddFile = ({ onFileCreate }: AddFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [key, setKey] = useState('');

  return (
    <form
      className="relative flex items-center w-full mt-[4px]"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!key || !SUPPORTED_EXTENSIONS.some((ext) => key.endsWith(ext))) return;
        await onFileCreate(key);
        setIsInputVisible(false);
        setKey('');
      }}
    >
      <Button
        type="reset"
        className="aspect-square"
        shadowClassName="bg-neutral-200/50 rounded-r-none"
        contentClassName="bg-white text-white rounded-r-none text-rose-500"
        onClick={() => {
          setIsInputVisible(false);
          setKey('');
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
      </Button>

      <div className="relative h-full w-full mr-9">
        <div className="absolute right-0 left-0 h-full w-full bg-neutral-200/50" />
        <input
          ref={inputRef}
          className="relative z-10 h-full w-full -mt-[2px] pr-2 outline-none text-sm font-mono"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <div
        className={cn(
          'absolute top-0 right-0 transition-[max-width] w-full z-20',
          isInputVisible ? 'max-w-[theme(spacing.9)]' : 'max-w-full',
        )}
      >
        <Button
          type={isInputVisible ? 'submit' : 'button'}
          className="w-full"
          shadowClassName={cn('bg-sky-600 z-[9]', isInputVisible && 'rounded-l-none')}
          contentClassName={cn('bg-sky-500 text-white', isInputVisible && 'rounded-l-none')}
          onClick={() => {
            setIsInputVisible(true);
            inputRef.current?.focus();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </form>
  );
};

type FileProps = {
  path: string;
  file: string;
};

const File = ({ path, file }: FileProps) => {
  const key = path + file;

  const [editor, setEditor] = useEditor();

  return (
    <button
      type="button"
      className="flex items-start py-1 cursor-pointer w-full"
      onClick={() => (setEditor.activeKey = key)}
    >
      <span className="w-3 mr-1 border-b border-l rounded-bl-lg border-neutral-200 h-[10.5px]" />
      <span
        className={cn(
          'group flex-1 flex items-center justify-between gap-2',
          editor.activeKey === key && 'font-semibold',
        )}
      >
        <span>{file}</span>
        {!file.startsWith('_') && (
          <span
            className="text-neutral-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              storage.delete('files', key);
              setEditor.keys = editor.keys.filter((k) => k !== key);
              setEditor.activeKey = '_temp';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </span>
    </button>
  );
};

type FolderProps = {
  path: string;
  level: number;
};

const Folder = ({ path, level }: FolderProps) => {
  const [editor, setEditor] = useEditor();
  const data = (() => {
    const folders = new Set<string>();
    const _files = [];
    for (const key of editor.keys) {
      if (!key.startsWith(path)) continue;
      const k = key.replace(path, '');
      if (k.includes('/')) {
        folders.add(k.split('/')[0]);
      } else {
        _files.push(k);
      }
    }
    return {
      folders: [...folders].sort((a, b) => a.localeCompare(b)),
      files: _files.sort((a, b) => a.localeCompare(b)),
    };
  })();

  const s = path.split('/');

  const isActive = editor.activeKey.includes(path);
  const isPointsActive = level === 0 && editor.activeKey === 'points';

  return (
    <div className={cn('relative', level === 1 ? 'ml-1' : level > 1 ? 'ml-5' : '')}>
      {level === 0 || data.files.length ? (
        <div
          className={cn(
            'absolute w-px bg-neutral-200 top-6',
            level === 0 ? '-bottom-1' : 'bottom-5',
            level >= 1 ? 'left-5' : 'left-1',
          )}
        />
      ) : (
        <div className={cn('absolute w-px bg-neutral-200 top-6 h-2', level >= 1 ? 'left-5' : 'left-1')} />
      )}
      <div className="flex items-start py-1 relative">
        {level >= 1 && <div className="w-3 mr-1 border-b border-l rounded-bl-lg border-neutral-200 h-[10.5px]" />}
        <span className={cn('text-violet-500', isActive || isPointsActive ? 'font-semibold' : 'font-medium')}>
          {s[s.length - 2]}
        </span>
      </div>
      {level === 0 && (
        <button
          type="button"
          className="flex items-start py-1 relative w-full"
          onClick={() => (setEditor.activeKey = 'points')}
        >
          <span className="w-3 mx-1 border-b border-l rounded-bl-lg border-neutral-200 h-[10.5px]" />
          <span className={cn('text-amber-500 ', isPointsActive ? 'font-semibold' : 'font-medium')}>points</span>
        </button>
      )}
      {data.folders.map((key) => (
        <Folder key={key} path={path + key + '/'} level={level + 1} />
      ))}
      {data.files.length ? (
        <div className={cn('flex-1', level > 0 ? 'ml-5' : 'ml-1')}>
          {data.files.map((key) => (
            <File path={path} key={key} file={key} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const Sidebar = () => {
  const params = useParams() as { solarSystem: string };
  return (
    <div className="text-sm overflow-hidden bg-white rounded-lg shadow-sm border border-neutral-200/50">
      <div className="overflow-y-auto h-full px-2 py-1">
        <div className="flex flex-col">
          <Folder path={`${params.solarSystem}/`} level={0} />
        </div>
      </div>
    </div>
  );
};

type Values = Record<string, string>;

const Editor = () => {
  const params = useParams();
  const revalidator = useRevalidator();

  const [editor, setEditor] = useEditor();
  const solarSystem = useSolarSystem();
  const files = useFiles();

  const [values, setValues] = useState<Values>({});

  useEffect(() => {
    const planet = solarSystem.planets.find((planet) => planet.id === params.planet);
    setEditor.activeKey = planet?.file || '_temp';
  }, [params.planet]);

  useEffect(() => {
    if (editor.activeKey === '_temp' || editor.activeKey === 'points') {
      if (setEditor.value) setEditor.value = '';
      return;
    }
    (async () => {
      const value = await storage.get('files', editor.activeKey);
      setEditor.value = value || '';
    })();
  }, [editor.activeKey]);

  const isPoints = editor.activeKey === 'points';
  const isJSON = editor.activeKey.endsWith('.json');

  return (
    <div
      id="editor"
      className={cn(
        'fixed h-full w-full p-1 inset-0 transition-transform duration-500 bg-neutral-100 z-[20] flex gap-2',
        editor.isVisible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <PanelGroup direction="horizontal">
        <Panel defaultSizePixels={400} collapsible minSizePixels={100}>
          <div className="flex flex-col gap-2 h-full p-2 pr-1">
            <Sidebar />
            <AddFile
              onFileCreate={async (key) => {
                const file = { key: files.buildKey(key), body: values['_temp'] };
                setEditor.keys.push(file.key);
                storage.add('files', file.key, file.body);
                setEditor.activeKey = file.key;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                setValues(({ _temp, ...prev }) => prev);
              }}
            />
          </div>
        </Panel>

        <PanelResizeHandle className="flex items-center justify-center data-[resize-handle-active]:[--size:calc(100%-theme(spacing.4))] relative before:content-[''] before:absolute before:top-2 before:-right-2 before:w-5 before:h-[calc(100%-theme(spacing.4))] before:z-10">
          <div className="h-[var(--size,theme(spacing.12))] w-1 rounded-full bg-neutral-300 transition-all" />
        </PanelResizeHandle>

        <Panel minSizePercentage={50}>
          <div className="p-2 pl-1 h-full">
            <form
              className="h-full w-full bg-neutral-50 rounded-lg flex flex-col overflow-hidden shadow-sm flex-1 border border-neutral-200/50"
              onReset={async () => {
                setEditor.isVisible = false;
                await sleep(500);
                setValues({});
              }}
              onSubmit={(e) => {
                e.preventDefault();
                Object.keys(values).forEach((key) => {
                  if (key === '_temp') return;
                  if (key === 'points') {
                    const obj = JSON.parse(values[key]);
                    for (const key of Object.keys(obj)) points.save(key, obj[key]);
                  } else {
                    storage.put('files', files.buildKey(key), values[key]);
                  }
                });
                setEditor.isVisible = false;
                setEditor.value = values[setEditor.activeKey] || '';
                setValues({});
                revalidator.revalidate();
              }}
            >
              <div className="bg-white h-full w-full shadow-sm overflow-y-auto overscroll-contain flex-1 flex border-b border-neutral-200/50">
                <CodeMirror
                  value={(() => {
                    if (isPoints) return JSON.stringify(points.value, null, 2);
                    const v = values[editor.activeKey] || editor.value || '';
                    return isJSON ? prettifyJSON(v) : v;
                  })()}
                  width="100%"
                  height="100%"
                  theme={githubLight}
                  extensions={(() => {
                    const extensions = [EditorView.lineWrapping];
                    if (editor.activeKey.endsWith('.md')) extensions.push(markdown({ completeHTMLTags: false }));
                    if (isPoints || isJSON) extensions.push(json());
                    return extensions;
                  })()}
                  onChange={(v) => setValues((prev) => ({ ...prev, [editor.activeKey]: isJSON ? uglifyJSON(v) : v }))}
                  className="w-full h-full"
                />
              </div>

              <div className="flex justify-end p-2 gap-2">
                <Button shadowClassName="bg-rose-600" contentClassName="bg-rose-500 text-white px-4 py-2" type="reset">
                  Cancel
                </Button>
                <Button
                  shadowClassName="bg-violet-600"
                  contentClassName="bg-violet-500 text-white px-4 py-2"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Editor;
