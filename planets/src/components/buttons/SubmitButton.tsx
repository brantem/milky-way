import { useState, useEffect } from 'react';

import Button from '../Button';

import { cn, sleep } from '../../lib/helpers';

type SubmitButtonProps = {
  onClick(): Promise<void>;
};

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isSubmitted) return;
      setIsSubmitted(true);
      await sleep(350);
      setIsClicked(false);
      await sleep(2000);
      setIsSubmitted(false);
    })();
  }, [isSubmitted]);

  return (
    <Button
      shadowClassName={!isClicked && isSubmitted ? 'bg-lime-600' : 'bg-black'}
      contentClassName={cn('text-white px-4 py-2', !isClicked && isSubmitted ? 'bg-lime-500' : 'bg-neutral-800')}
      onClick={async () => {
        if (isClicked) return;
        setIsClicked(true);
        await onClick();
        setIsSubmitted(true);
      }}
      disabled={isClicked || isSubmitted}
    >
      <span className={cn('transition-all', isClicked || isSubmitted ? 'opacity-0' : 'opacity-100')}>Submit</span>
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center h-full w-full transition-opacity',
          isClicked ? 'opacity-100' : 'opacity-0',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn(
            'w-6 h-6 transition-transform ease-[cubic-bezier(0.6,-0.28,0.74,0.05)]',
            isClicked && !isSubmitted ? '[animation-delay:300ms] animate-bounce' : '',
            isClicked && isSubmitted && 'translate-x-16',
          )}
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </span>

      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center h-full w-full transition-opacity',
          isSubmitted ? 'delay-[350ms] opacity-100' : 'opacity-0',
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </Button>
  );
};

export default SubmitButton;
