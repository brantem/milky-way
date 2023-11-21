import { useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';

import Button from './Button';

import type { File } from '../lib/types';
import { useStore } from '../lib/store';
import { cn } from '../lib/helpers';

const supportedExtensions = ['.json', '.md', '.txt'];

type AddFileProps = {
  onFileCreated(file: File): void;
};

const AddFile = ({ onFileCreated }: AddFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const saveFile = useStore((state) => state.saveFile);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [key, setKey] = useState('');

  return (
    <form
      className={cn(
        'flex items-center w-full',
        isInputVisible ? 'max-w-none' : 'max-w-[theme(spacing.9] delay-[250ms]',
      )}
      onSubmit={(e) => {
        e.preventDefault();
        const file = { key: key.trim(), body: '' };
        if (!file.key || !supportedExtensions.some((ext) => file.key.endsWith(ext))) return;
        saveFile(file.key, '');
        onFileCreated(file);
        setIsInputVisible(false);
        setKey('');
      }}
    >
      <div className="bg-neutral-100 z-10 -mt-[3px] pt-[3px]">
        <Button
          type={isInputVisible ? 'submit' : 'button'}
          className="aspect-square"
          shadowClassName={cn('bg-sky-600 z-[9]', isInputVisible && 'rounded-r-none')}
          contentClassName={cn('bg-sky-500 text-white', isInputVisible && 'rounded-r-none')}
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

      <div
        className={cn('flex items-center h-full transition-transform z-[8]', !isInputVisible && '-translate-x-full')}
      >
        <div className="relative h-full w-full flex-1">
          <div className="absolute right-0 left-0 h-full w-full bg-neutral-200/50" />
          <input
            ref={inputRef}
            className="relative z-10 h-full w-full -mt-[2px] px-3 outline-none"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <Button
          type="reset"
          className="aspect-square"
          shadowClassName="bg-neutral-200/50 rounded-l-none"
          contentClassName="bg-white text-white rounded-l-none text-rose-500"
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
      </div>
    </form>
  );
};

type FilesProps = AddFileProps & {
  activeFileKey: File['key'];
  onFileClick(file: File): void;
  onFileDeleted(): void;
};

const Files = ({ activeFileKey, onFileClick, onFileCreated, onFileDeleted }: FilesProps) => {
  const { files, deleteFile } = useStore((state) => ({ files: state.files, deleteFile: state.deleteFile }));

  return (
    <div className="flex font-mono text-sm flex-1 overflow-x-auto no-scrollbar -mt-[3px] pt-[3px]">
      <div className="bg-neutral-100 z-10 flex gap-2 pr-2 -mt-[3px] pt-[3px]">
        {files.map((file) => {
          const isActive = file.key === activeFileKey;
          return (
            <div key={file.key} className="flex items-center bg-neutral-100 group">
              <Button
                type="button"
                shadowClassName="bg-neutral-200/50 rounded-r-none"
                contentClassName="bg-white px-4 rounded-r-none group-disabled:cursor-default"
                disabled={isActive}
                onClick={() => onFileClick(file)}
              >
                {file.key}
              </Button>
              <Button
                type="button"
                className="aspect-square"
                shadowClassName="bg-neutral-200/50 rounded-l-none"
                contentClassName={cn(
                  'bg-white text-white rounded-l-none text-neutral-300 group-enabled:group-hover:text-rose-500',
                  isActive
                    ? 'group-enabled:![transform:translate3d(0,0,0)] group-enabled:group-hover:![transform:translate3d(0,-2px,0)]'
                    : 'group-active:![transform:translate3d(0,0,0)] group-hover:![transform:translate3d(0,-3px,0)]',
                )}
                onClick={() => {
                  deleteFile(file.key);
                  onFileDeleted();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          );
        })}
      </div>

      <AddFile onFileCreated={onFileCreated} />
    </div>
  );
};

const Editor = () => {
  const { files, saveFile, isOpen, toggle } = useStore((state) => ({
    files: state.files,
    saveFile: state.saveFile,
    isOpen: state.isEditorOpen,
    toggle: state.toggleEditor,
  }));

  const [activeFileKey, setActiveFileKey] = useState(files[0].key);
  const [values, setValues] = useState<Record<string, string>>({});

  const file = files.find((file) => file.key === activeFileKey)!;

  return (
    <div
      id="editor"
      className={cn(
        'fixed h-full w-full p-2 inset-0 transition-transform duration-500 bg-neutral-100 z-[20] flex flex-col gap-2',
        isOpen ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="flex items-center gap-2 w-full justify-betweens">
        <Files
          activeFileKey={activeFileKey}
          onFileClick={(file) => setActiveFileKey(file.key)}
          onFileCreated={(file) => setActiveFileKey(file.key)}
          onFileDeleted={() => setActiveFileKey(files[0].key)}
        />

        <Button
          className="aspect-square"
          shadowClassName="bg-rose-600"
          contentClassName="bg-rose-500 text-white"
          onClick={() => {
            toggle();
            setTimeout(() => {
              setValues({});
            }, 500);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </Button>
      </div>

      <form
        className="h-full w-full bg-neutral-50 rounded-lg flex flex-col overflow-hidden shadow-sm flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          Object.keys(values).forEach((key) => {
            saveFile(key, values[key]);
          });
          toggle();
        }}
      >
        <div className="bg-white h-full w-full shadow-sm overflow-y-auto overscroll-contain flex-1 flex">
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
          <Button shadowClassName="bg-violet-600" contentClassName="bg-violet-500 text-white px-4 py-2" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
