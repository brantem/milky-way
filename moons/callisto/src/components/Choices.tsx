import { useDroppable } from '@dnd-kit/core';

import Choice from './Choice';

import { useAppState } from '../lib/state';

const Choices = () => {
  const [state] = useAppState();

  const { setNodeRef, isOver } = useDroppable({
    id: 'choices',
    data: {
      accepts: ['callisto-choice'],
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={[
        'flex flex-wrap gap-3 justify-center rounded-lg p-2',
        isOver ? 'bg-neutral-100' : 'bg-transparent',
      ].join(' ')}
    >
      {state.choiceIds.map((choiceId, i) => (
        <Choice key={i} choiceId={choiceId} />
      ))}
    </div>
  );
};

export default Choices;
