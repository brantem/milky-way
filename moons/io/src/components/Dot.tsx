import { Side } from '../lib/types';

type DotProps = {
  side: Side;
  index: number;
};

const Dot = ({ side, index }: DotProps) => {
  return (
    <div
      data-side={side}
      data-index={index}
      className={[
        'dot relative rounded-full h-5 w-5 bg-amber-500 flex items-center justify-center cursor-pointer',
        "before:content-[''] before:h-10 before:w-10 before:absolute before:-top-2.5 before:-left-2.5",
        "after:content-[''] after:h-4 after:w-4 after:border-[4px] after:border-solid after:border-white after:rounded-full after:bg-amber-500 after:absolute after:top-[2px] after:left-[2px] after:box-border",
      ].join(' ')}
    />
  );
};

export default Dot;
