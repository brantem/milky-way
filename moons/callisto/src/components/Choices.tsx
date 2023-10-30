import { useDroppable } from '@dnd-kit/core';

import Choice from './Choice';

import { useAppState } from '../lib/state';

const Choices = () => {
  const [state] = useAppState();

  const { setNodeRef } = useDroppable({
    id: 'choices',
    data: {
      accepts: ['callisto-choice'],
    },
  });

  return (
    <div ref={setNodeRef} className="flex flex-wrap gap-3 justify-center">
      {state.choices.map((choice, i) => (
        <Choice key={i} choice={choice} />
      ))}
    </div>
  );
};

export default Choices;
