import { Side } from '../lib/types';

type DotProps = {
  side: Side;
};

const Dot = ({ side }: DotProps) => {
  return (
    <div
      className={[
        'dot [grid-area:dot] relative rounded-full h-[22px] w-[22px] bg-amber-500 flex items-center justify-center cursor-pointer',
        side === Side.Left ? 'justify-self-start' : 'justify-self-end',
        "before:content-[''] before:h-[42px] before:w-[42px] before:absolute before:-top-2.5 before:-left-2.5 before:rounded-full",
        "after:content-[''] after:h-[18px] after:w-[18px] after:border-[4px] after:border-solid after:border-white after:rounded-full after:absolute after:top-[2px] after:left-[2px] after:box-border",
      ].join(' ')}
    />
  );
};

export default Dot;
