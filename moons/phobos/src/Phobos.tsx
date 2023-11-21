import Markdown, { defaultUrlTransform } from 'react-markdown';

import type { File } from './lib/types.ts';

import './index.css';

type PhobosProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  files: File[];
  data: {
    file: string;
  };
  onPublish(action: string, data?: any): void;
};

const Phobos = ({ width = '100%', height = '100%', files, data, onPublish }: PhobosProps) => {
  const text = files.find((file) => file.key === data.file)?.body || '';
  return (
    <div id="phobos" style={{ width, height }}>
      <div className="h-full w-full overflow-auto py-2 px-3 flex justify-center font-sans">
        <Markdown
          className="markdown markdown-neutral w-full"
          urlTransform={(url) => {
            if (url.startsWith('color://')) return url;
            return defaultUrlTransform(url);
          }}
          components={{
            a({ href, children }) {
              if (children === undefined && href?.startsWith('color://')) {
                const color = href.split('color://')[1];
                return (
                  <span
                    className="group inline-block border-2 border-solid border-black/10 rounded-md h-6 w-6 !-mb-1.5 overflow-hidden cursor-pointer"
                    onClick={() => onPublish('color:set', color)}
                  >
                    <span
                      className="group-hover:brightness-110 group-active:brightness-100 h-full w-full block transition"
                      style={{ backgroundColor: color }}
                    />
                  </span>
                );
              } else {
                return <a href={href}>{children}</a>;
              }
            },
          }}
        >
          {text}
        </Markdown>
      </div>
    </div>
  );
};

export default Phobos;
