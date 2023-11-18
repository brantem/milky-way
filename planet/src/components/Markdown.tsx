import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

import { cn } from '../lib/helpers';

type MarkdownProps = {
  className?: string;
  children: string;
};

const Markdown = memo(({ className, children }: MarkdownProps) => {
  return <ReactMarkdown className={cn('prose w-full', className)}>{children}</ReactMarkdown>;
});

export default Markdown;
