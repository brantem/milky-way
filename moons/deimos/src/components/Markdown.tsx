import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';

type MarkdownProps = {
  className: string;
  children: string;
  onPublish(action: string, data?: any): void;
};

const Markdown = ({ className, children, onPublish }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className={['markdown relative z-10 max-w-none', className].join(' ')}
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
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
