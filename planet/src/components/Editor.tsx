import { useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import Button from './Button';

import type { File as _File } from '../lib/types';
import { useEditor, useFiles } from '../lib/store';
import { cn } from '../lib/helpers';

const ROOT = 'planets/';
const SUPPORTED_EXTENSIONS = ['.json', '.md', '.txt'];

type AddFileProps = {
  onFileCreated(file: _File): void;
};

const AddFile = ({ onFileCreated }: AddFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const saveFile = useFiles((state) => state.save);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [key, setKey] = useState('');

  return (
    <form
      className="relative flex items-center w-full mt-[4px]"
      onSubmit={(e) => {
        e.preventDefault();
        const file = { key: ROOT + key.trim().replace(new RegExp(`^${ROOT.replace('/', '/')}`), ''), body: '' };
        if (!file.key || !SUPPORTED_EXTENSIONS.some((ext) => file.key.endsWith(ext))) return;
        saveFile(file.key, '');
        onFileCreated(file);
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
  level: number;
  isActive: boolean;
  onClick(): void;
  onDeleteClick(): void;
};

const File = ({ path, file, level, isActive, onClick, onDeleteClick }: FileProps) => {
  const deleteFile = useFiles((state) => state.delete);

  return (
    <button type="button" className="flex items-center py-1 cursor-pointer" onClick={onClick}>
      <span
        className="w-[calc(theme(spacing.4)*var(--level))] h-[1px] bg-neutral-300 mx-1"
        style={{ '--level': level } as React.CSSProperties}
      />
      <span className={cn('group flex-1 flex items-center justify-between gap-2', isActive && 'font-bold')}>
        <span>{file.key}</span>
        {!file.key.endsWith('_planet.json') && (
          <span
            className="text-neutral-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              deleteFile(path + file.key);
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
  const { folders, files } = useFiles((state) => {
    let folders = new Set<string>();
    let files = [];
    for (let file of state.get(path)) {
      if (file.key.includes('/')) {
        folders.add(file.key.split('/')[0]);
      } else {
        files.push(file);
      }
    }
    return {
      folders: [...folders].sort((a, b) => a.localeCompare(b)),
      files: files.sort((a, b) => a.key.localeCompare(b.key)),
    };
  });

  const s = path.split('/');

  return (
    <>
      <div className="flex items-center py-1">
        {level >= 1 && (
          <div
            className="w-[calc(theme(spacing.4)*var(--level))] h-[1px] bg-neutral-300 mx-1"
            style={{ '--level': level } as React.CSSProperties}
          />
        )}
        <div className="relative pl-[calc(theme(spacing.4)*var(--level))]">{s[s.length - 2]}</div>
      </div>
      {folders.map((folder) => (
        <Folder
          key={folder}
          path={path + folder + '/'}
          level={level + 1}
          activeFileKey={activeFileKey}
          onFileClick={onFileClick}
          onFileDeleted={onFileDeleted}
        />
      ))}
      {files.map((file) => (
        <File
          path={path}
          key={file.key}
          file={file}
          level={level + 1}
          onClick={() => onFileClick(path + file.key)}
          onDeleteClick={onFileDeleted}
          isActive={path + file.key === activeFileKey}
        />
      ))}
    </>
  );
};

const Sidebar = ({ activeFileKey, onFileClick, onFileDeleted }: SidebarProps) => {
  return (
    <div className="text-sm font-mono overflow-hidden bg-white rounded-lg shadow-sm border border-neutral-200/50">
      <div className="overflow-y-auto h-full p-2 pt-1">
        <div
          className={cn(
            'relative flex flex-col',
            "before:content-[''] before:absolute before:top-[28px] before:bottom-[13.5px] before:left-1 before:w-[1px] before:bg-neutral-300",
          )}
        >
          <Folder
            path={ROOT}
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
  const { isOpen, toggle } = useEditor();
  const { files, saveFile, incrementVersion } = useFiles((state) => ({
    files: state.files,
    saveFile: state.save,
    incrementVersion: state.incrementVersion,
  }));

  const [activeFileKey, setActiveFileKey] = useState(files[0].key);
  const [values, setValues] = useState<Record<string, string>>({});

  const file = files.find((file) => file.key === activeFileKey)!;

  return (
    <div
      id="editor"
      className={cn(
        'fixed h-full w-full p-1 inset-0 transition-transform duration-500 bg-neutral-100 z-[20] flex gap-2',
        isOpen ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <PanelGroup direction="horizontal">
        <Panel defaultSizePixels={300} collapsible minSizePixels={100}>
          <div className="flex flex-col gap-2 h-full p-2 pr-1">
            <Sidebar
              activeFileKey={activeFileKey}
              onFileClick={(key) => setActiveFileKey(key)}
              onFileDeleted={() => setActiveFileKey(files[0].key)}
            />
            <AddFile onFileCreated={(file) => setActiveFileKey(file.key)} />
          </div>
        </Panel>

        <PanelResizeHandle className="flex items-center justify-center data-[resize-handle-active]:[--size:calc(100%-theme(spacing.4))] relative before:content-[''] before:absolute before:top-2 before:-right-2 before:w-5 before:h-[calc(100%-theme(spacing.4))] before:z-10">
          <div className="h-[var(--size,theme(spacing.12))] w-1 rounded-full bg-neutral-300 transition-all" />
        </PanelResizeHandle>

        <Panel minSizePercentage={50}>
          <div className="p-2 pl-1 h-full">
            <form
              className="h-full w-full bg-neutral-50 rounded-lg flex flex-col overflow-hidden shadow-sm flex-1 border border-neutral-200/50"
              onSubmit={(e) => {
                e.preventDefault();
                Object.keys(values).forEach((key) => saveFile(key, values[key]));
                incrementVersion();
                toggle();
              }}
            >
              <div className="bg-white h-full w-full shadow-sm overflow-y-auto overscroll-contain flex-1 flex border-b border-neutral-200/50">
                <CodeMirror
                  value={values[activeFileKey] || file.body}
                  width="100%"
                  height="100%"
                  theme={githubLight}
                  extensions={(() => {
                    const extensions = [EditorView.lineWrapping];
                    if (file.key.endsWith('.md')) extensions.push(markdown({ completeHTMLTags: false }));
                    if (file.key.endsWith('.json')) extensions.push(json());
                    return extensions;
                  })()}
                  onChange={(value) => setValues((prev) => ({ ...prev, [activeFileKey]: value }))}
                  className="w-full h-full"
                />
              </div>

              <div className="flex justify-end p-2">
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
