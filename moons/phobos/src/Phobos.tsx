import { memo, useEffect, useState } from 'react';
import Markdown, { defaultUrlTransform } from 'react-markdown';

import { Resource, type File } from './lib/types';

import './index.css';

type PhobosProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  parent: {
    id: string;
    request(resource: Resource.Files, keys: string[]): Promise<(File | null)[]>;
  };
  id: string;
  data: {
    content: {
      file: string;
    };
  };
  onPublish(action: string, data?: unknown): void;
};

const Phobos = memo(({ width = '100%', height = '100%', parent, id, data, onPublish }: PhobosProps) => {
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      const [file] = await parent.request(Resource.Files, [data.content.file]);
      setText(file?.body || '');
    })();
  }, []);

  return (
    <div id={`phobos-${id}`} style={{ width, height }}>
      <div className="h-full w-full overflow-auto py-5 px-3 font-sans">
        <Markdown
          className="markdown markdown-neutral w-full mx-auto"
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
});

export default Phobos;
