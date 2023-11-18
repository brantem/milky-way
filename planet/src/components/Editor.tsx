import { useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';

import Button from './Button';

import { useStore } from '../lib/store';
import { cn } from '../lib/helpers';

const Editor = () => {
  const { planet, updatePlanet, isOpen, toggle } = useStore((state) => ({
    planet: state.planet,
    updatePlanet: state.updatePlanet,
    isOpen: state.isEditorOpen,
    toggle: state.toggleEditor,
  }));

  const [value, setValue] = useState('');

  return (
    <div
      id="editor"
      className={cn(
        'fixed h-full w-full p-2 inset-0 transition-transform duration-500 bg-neutral-100 z-[20]',
        isOpen ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <form
        className="h-full w-full bg-neutral-50 rounded-lg flex flex-col overflow-hidden shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          if (value) updatePlanet(JSON.parse(value));
          toggle();
        }}
      >
        <div className="bg-white h-full w-full shadow-sm overflow-y-auto overscroll-contain flex-1 flex">
          <CodeMirror
            value={JSON.stringify(planet, null, 2)}
            height="100%"
            theme={githubLight}
            extensions={[json(), EditorView.lineWrapping]}
            onChange={(v) => setValue(v)}
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
