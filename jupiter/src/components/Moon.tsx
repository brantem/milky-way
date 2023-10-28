import { Suspense, useState, lazy } from 'react';

type MoonProps = {
  name: string;
  url: string;
};

const Moon = ({ url }: MoonProps) => {
  const Component = lazy(() => import(/* @vite-ignore */ url));
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Component />
    </Suspense>
  );
};

const MoonWrapper = ({ name, url }: MoonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) return <Moon name={name} url={url} />;

  return (
    <button className="px-2 py-1 rounded-md bg-white text-black hover:bg-neutral-100" onClick={() => setIsOpen(true)}>
      Load {name}
    </button>
  );
};

export default MoonWrapper;
