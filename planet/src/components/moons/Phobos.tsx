import Markdown from '../Markdown';

type PhobosProps = {
  data: {
    text: string;
  };
};

const Phobos = ({ data }: PhobosProps) => {
  return (
    <div className="h-full w-full overflow-auto py-2 px-3 flex justify-center">
      <Markdown className="prose-neutral">{data.text}</Markdown>
    </div>
  );
};

export default Phobos;
