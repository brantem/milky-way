import Markdown from 'react-markdown';

import './index.css';

type DeimosProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  data: {
    items: { text: string }[];
  };
};

const Deimos = ({ width = '100%', height = '100%', data }: DeimosProps) => {
  return (
    <div id="deimos" style={{ width, height }}>
      <div className="h-full w-full overflow-y-auto bg-yellow-50/50 font-sans">
        <ol className="list-none overflow-hidden m-0 p-0">
          {data.items.map((item, i) => (
            <li
              key={i}
              className="relative py-2 px-3 min-h-[theme(spacing.16)] overflow-hidden border-0 border-b border-solid border-b-yellow-900/10"
            >
              <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-yellow-200/50 leading-none italic select-none">
                {i + 1}
              </span>
              <Markdown className="markdown relative z-10 text-yellow-900 max-w-none">{item.text}</Markdown>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Deimos;
