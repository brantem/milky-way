import Lines from './components/Lines';

import './index.css';

type IoProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  left: string[];
  right: string[];
};

const Dot = () => {
  return (
    <div className="dot rounded-full h-5 w-5 bg-amber-500 flex items-center justify-center">
      <div className="h-4 w-4 border-[4px] border-solid border-white rounded-full bg-amber-500" />
    </div>
  );
};

const Left = ({ items }: { items: string[] }) => {
  return (
    <ol className="list-none flex flex-col gap-12 m-0 p-0 select-none">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span>{item}</span>
          <Dot />
        </li>
      ))}
    </ol>
  );
};

const Right = ({ items }: { items: string[] }) => {
  return (
    <ol className="list-none flex flex-col gap-12 m-0 p-0 select-none">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <Dot />
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
};

const Io = ({ left, right, height, width }: IoProps) => {
  return (
    <div id="io" style={{ height, width }}>
      <div className="relative w-full h-full flex items-center justify-center font-sans text-5xl font-semibold gap-52">
        <Left items={left} />

        <Right items={right} />

        <Lines />
      </div>
    </div>
  );
};

export default Io;
