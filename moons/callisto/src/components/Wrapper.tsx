import { useState } from 'react';
import { DndContext, DragOverlay, type ClientRect } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import { BaseChoice } from './Choice';

import { useCallisto } from '../lib/state';

type WrapperProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

const Wrapper = ({ containerRef, children }: WrapperProps) => {
  const { fillBlank, putBackChoice } = useCallisto();

  const [activeId, setActiveId] = useState('');

  return (
    <DndContext
      modifiers={[
        (args) => {
          const containerNodeRect = containerRef.current?.getBoundingClientRect() as ClientRect | null;
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
          putBackChoice(active.id.toString());
        } else {
          if (!over.data.current!.accepts.includes(active.data.current!.type)) return;
          fillBlank(over.id.toString(), active.id.toString());
        }
      }}
    >
      {children}
      <DragOverlay dropAnimation={null}>
        {activeId ? <BaseChoice choiceId={activeId} className="cursor-grabbing" /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Wrapper;
