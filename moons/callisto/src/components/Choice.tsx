import { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

import { useCallisto } from '../lib/state';

type ChoiceProps = React.ComponentPropsWithoutRef<'span'> & {
  choiceId: string;
};

export const BaseChoice = forwardRef<HTMLSpanElement, ChoiceProps>(({ className, choiceId, ...props }, ref) => {
  const { m } = useCallisto();
  const choice = m.get(choiceId);
  if (!choice) return null;
  return (
    <span
      ref={ref}
      {...props}
      className={['px-2 py-1 rounded-lg bg-lime-200 select-none touch-none', className].filter(Boolean).join(' ')}
    >
      {choice.text}
    </span>
  );
});

export const Choice = ({ choiceId }: Pick<ChoiceProps, 'choiceId'>) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: choiceId,
    data: {
      type: 'callisto-choice',
    },
  });

  return (
    <BaseChoice
      choiceId={choiceId}
      ref={setNodeRef}
      className={isDragging ? 'opacity-50' : 'cursor-grab'}
      {...listeners}
      {...attributes}
    />
  );
};

export default Choice;
