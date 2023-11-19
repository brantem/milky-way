import Markdown from 'react-markdown';

import './index.css';

type PhobosProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  data: {
    text: string;
  };
};

const Phobos = ({ width = '100%', height = '100%', data }: PhobosProps) => {
  return (
    <div id="phobos" style={{ width, height }}>
      <div className="h-full w-full overflow-auto py-2 px-3 flex justify-center font-sans">
        <Markdown className="markdown markdown-neutral w-full">{data.text}</Markdown>
      </div>
    </div>
  );
};

export default Phobos;
