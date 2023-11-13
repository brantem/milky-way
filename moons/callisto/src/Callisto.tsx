import { useRef, useState } from 'react';
import { type ClientRect, DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import Text from './components/Text';
import Choices from './components/Choices';
import { BaseChoice } from './components/Choice';

import { AppProvider, type AppProviderProps, useAppState } from './lib/state';

import './index.css';

type AppProps = {
  data: {
    text: string;
  };
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
};

const App = ({ data, height = '100%', width = '100%' }: AppProps) => {
  const callistoRef = useRef<HTMLDivElement>(null);
  const [, set] = useAppState();

  const [activeId, setActiveId] = useState('');

  return (
    <div ref={callistoRef} id="callisto" style={{ height, width }}>
      <DndContext
        modifiers={[
          (args) => {
            const containerNodeRect = callistoRef.current?.getBoundingClientRect() as ClientRect | null;
            return restrictToParentElement({ ...args, containerNodeRect });
          },
        ]}
        onDragStart={({ active }) => {
          setActiveId(active.id as string);
        }}
        onDragEnd={({ active, over }) => {
          setActiveId('');
          if (!over) return;
          if (over.id === 'choices') {
            set.putBackChoice(active.id.toString());
          } else {
            if (!over.data.current!.accepts.includes(active.data.current!.type)) return;
            set.fillBlank(over.id.toString(), active.id.toString());
          }
        }}
      >
        <div className="relative font-sans text-4xl font-semibold h-full w-full p-6 flex flex-col">
          <div className="flex-1 mx-auto">
            <Text text={data.text} />
          </div>

          <Choices />

          <DragOverlay dropAnimation={null}>
            {activeId ? <BaseChoice choiceId={activeId} className="cursor-grabbing" /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

type CallistoProps = AppProps & Omit<AppProviderProps, 'children'>;

const Callisto = (props: CallistoProps) => {
  return (
    <AppProvider {...props}>
      <App {...props} />
    </AppProvider>
  );
};

export default Callisto;
