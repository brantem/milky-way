import Blank from './Blank';

type TextProps = {
  text: string;
};

const Text = ({ text }: TextProps) => {
  return (
    <p className="flex flex-wrap gap-3 items-baseline max-w-6xl m-0">
      {text.split(/\s+/).map((word, i) => {
        const isBlank = /__\w+__/.test(word);
        return isBlank ? <Blank key={i}>{word}</Blank> : <span key={i}>{word}</span>;
      })}
    </p>
  );
};

export default Text;
