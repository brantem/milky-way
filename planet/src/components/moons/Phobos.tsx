import { forwardRef } from 'react';

import type { MoonHandle, MoonProps } from '../Moon';
import Markdown from '../Markdown';

type PhobosProps = MoonProps & {
  data: {
    text: string;
  };
};

const Phobos = forwardRef<MoonHandle, PhobosProps>(({ data }) => {
  return (
    <div className="h-full w-full overflow-auto py-2 px-3 flex justify-center">
      <Markdown className="prose-neutral">{data.text}</Markdown>
    </div>
  );
});

export default Phobos;
