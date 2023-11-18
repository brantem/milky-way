import Markdown from '../Markdown';

type DeimosProps = {
  data: {
    items: { text: string }[];
  };
};

const Deimos = ({ data }: DeimosProps) => {
  return (
    <div className="h-full w-full overflow-y-auto bg-yellow-50/50">
      <ol className="list-none">
        {data.items.map((item, i) => (
          <li
            key={i}
            className="relative py-2 px-3 min-h-[theme(spacing.16)] overflow-hidden border-b border-b-yellow-900/10"
          >
            <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-yellow-200/50 leading-none italic select-none">
              {i + 1}
            </span>
            <Markdown className="relative z-10 text-yellow-900 max-w-none">{item.text}</Markdown>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Deimos;
