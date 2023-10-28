import { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

type ChoiceProps = React.ComponentPropsWithoutRef<'span'> & {
  choice: string;
};

export const BaseChoice = forwardRef<HTMLSpanElement, ChoiceProps>(({ className, choice, ...props }, ref) => {
  return (
    <span
      ref={ref}
      {...props}
      className={['px-2 py-1 rounded-lg bg-lime-200 select-none touch-none', className].filter(Boolean).join(' ')}
    >
      {choice}
    </span>
  );
});

export const Choice = ({ choice }: Pick<ChoiceProps, 'choice'>) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: choice,
    data: {
      type: 'callisto-choice',
    },
  });

  return (
    <BaseChoice
      choice={choice}
      ref={setNodeRef}
      className={isDragging ? 'opacity-50' : 'cursor-grab'}
      {...listeners}
      {...attributes}
    />
  );
};

export default Choice;
