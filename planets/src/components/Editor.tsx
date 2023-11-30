import { useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import Button from './Button';

import type { File as _File } from '../lib/types';
import { useEditor, files, useFiles, points } from '../lib/state';
import { cn, sleep } from '../lib/helpers';

const SUPPORTED_EXTENSIONS = ['.json', '.md', '.txt'];

type AddFileProps = {
  onFileCreate(key: string): void;
};

const AddFile = ({ onFileCreate }: AddFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [key, setKey] = useState('');

  return (
    <form
      className="relative flex items-center w-full mt-[4px]"
      onSubmit={(e) => {
        e.preventDefault();
        if (!key || !SUPPORTED_EXTENSIONS.some((ext) => key.endsWith(ext))) return;
        onFileCreate(key);
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

type SidebarProps = {
  activeFileKey: string;
  onFileClick(key: _File['key']): void;
  onFileDeleted(): void;
};

type FileProps = {
  path: string;
  file: _File;
  isActive: boolean;
  onClick(): void;
  onDeleteClick(): void;
};

const File = ({ path, file, isActive, onClick, onDeleteClick }: FileProps) => {
  return (
    <button type="button" className="flex items-start py-1 cursor-pointer w-full" onClick={onClick}>
      <span className="w-3 mr-1 border-b border-l rounded-bl-lg border-neutral-200 h-[10.5px]" />
      <span className={cn('group flex-1 flex items-center justify-between gap-2', isActive && 'font-semibold')}>
        <span>{file.key}</span>
        {!file.key.endsWith('_planet.json') && (
          <span
            className="text-neutral-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              files.delete(path + file.key);
              onDeleteClick();
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

type FolderProps = SidebarProps & {
  path: string;
  level: number;
};

const Folder = ({ path, level, activeFileKey, onFileClick, onFileDeleted }: FolderProps) => {
  const [files] = useFiles();
  const data = (() => {
    let folders = new Set<string>();
    let _files = [];
    for (let file of files.value) {
      if (!file.key.startsWith(path)) continue;
      const key = file.key.replace(path, '');
      if (key.includes('/')) {
        folders.add(key.split('/')[0]);
      } else {
        _files.push({ ...file, key });
      }
    }
    return {
      folders: [...folders].sort((a, b) => a.localeCompare(b)),
      files: _files.sort((a, b) => a.key.localeCompare(b.key)),
    };
  })();

  const s = path.split('/');

  const isActive = activeFileKey.includes(path);
  const isPointsActive = level === 0 && activeFileKey === 'points';

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
        <button type="button" className="flex items-start py-1 relative w-full" onClick={() => onFileClick('points')}>
          <span className="w-3 mx-1 border-b border-l rounded-bl-lg border-neutral-200 h-[10.5px]" />
          <span className={cn('text-amber-500 ', isPointsActive ? 'font-semibold' : 'font-medium')}>points</span>
        </button>
      )}
      {data.folders.map((folder) => (
        <Folder
          key={folder}
          path={path + folder + '/'}
          level={level + 1}
          activeFileKey={activeFileKey}
          onFileClick={onFileClick}
          onFileDeleted={onFileDeleted}
        />
      ))}
      {data.files.length ? (
        <div className={cn('flex-1', level > 0 ? 'ml-5' : 'ml-1')}>
          {data.files.map((file) => (
            <File
              path={path}
              key={file.key}
              file={file}
              onClick={() => onFileClick(path + file.key)}
              onDeleteClick={onFileDeleted}
              isActive={path + file.key === activeFileKey}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const Sidebar = ({ activeFileKey, onFileClick, onFileDeleted }: SidebarProps) => {
  return (
    <div className="text-sm overflow-hidden bg-white rounded-lg shadow-sm border border-neutral-200/50">
      <div className="overflow-y-auto h-full px-2 py-1">
        <div className="flex flex-col">
          <Folder
            path="planets/"
            level={0}
            activeFileKey={activeFileKey}
            onFileClick={onFileClick}
            onFileDeleted={onFileDeleted}
          />
        </div>
      </div>
    </div>
  );
};

const Editor = () => {
  const [editor, setEditor] = useEditor();
  const [files, setFiles] = useFiles();

  const [activeFileKey, setActiveFileKey] = useState('_temp');
  const [values, setValues] = useState<Record<string, string>>({});

  const isPointsActive = activeFileKey === 'points';
  const file = isPointsActive
    ? { key: 'points.json', body: JSON.stringify(points.value, null, 2) }
    : files.value.find((file) => file.key === activeFileKey);

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
            <Sidebar
              activeFileKey={activeFileKey}
              onFileClick={(key) => setActiveFileKey(key)}
              onFileDeleted={() => setActiveFileKey(files.value[0].key)}
            />
            <AddFile
              onFileCreate={(key) => {
                const file = setFiles.save(key, values['_temp'], false);
                setValues(({ _temp, ...prev }) => prev);
                setActiveFileKey(file.key);
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
                    points.value = JSON.parse(values[key]);
                  } else {
                    setFiles.save(key, values[key]);
                  }
                });
                ++setEditor.saved;
                setEditor.isVisible = false;
              }}
            >
              <div className="bg-white h-full w-full shadow-sm overflow-y-auto overscroll-contain flex-1 flex border-b border-neutral-200/50">
                <CodeMirror
                  value={values[activeFileKey] || file?.body || ''}
                  width="100%"
                  height="100%"
                  theme={githubLight}
                  extensions={(() => {
                    const extensions = [EditorView.lineWrapping];
                    if (file?.key.endsWith('.md')) extensions.push(markdown({ completeHTMLTags: false }));
                    if (file?.key.endsWith('.json')) extensions.push(json());
                    return extensions;
                  })()}
                  onChange={(value) => setValues((prev) => ({ ...prev, [activeFileKey]: value }))}
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
