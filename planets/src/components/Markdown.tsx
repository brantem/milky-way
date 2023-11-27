import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

import { cn } from '../lib/helpers';

type MarkdownProps = {
  children: string;
  className?: string;
};

const Markdown = memo(({ children, className }: MarkdownProps) => {
  return <ReactMarkdown className={cn('prose prose-neutral', className)}>{children}</ReactMarkdown>;
});

export default Markdown;
