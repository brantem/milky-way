import { useDroppable } from '@dnd-kit/core';

import Choice from './Choice';

import { useCallisto } from '../lib/state';

type BlankProps = {
  children: string;
};

const Blank = ({ children }: BlankProps) => {
  const [, before, id, after] = children.match(/(.*)(__\w+__)(.*)/)!;

  const { answers } = useCallisto();
  const choiceId = answers.find((item) => item.blankId === id)?.choiceId;

  const { setNodeRef } = useDroppable({
    id,
    data: {
      accepts: ['callisto-choice'],
    },
  });

  return (
    <span className="inline-flex items-baseline -my-1" ref={setNodeRef}>
      {before}
      {choiceId ? (
        <Choice choiceId={choiceId} />
      ) : (
        <span className="bg-lime-100 rounded-lg text-center px-2 py-1 select-none min-w-[theme(spacing.32)]">
          &nbsp;
        </span>
      )}
      {after}
    </span>
  );
};

export default Blank;
