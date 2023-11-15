import { Suspense, useState, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type MoonProps = {
  name: string;
  url: string;

  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  data: Record<string, any>;
  onChange(data: Record<string, any>, points: number): void;
  debug?: boolean;
};

const Moon = ({ url, ...props }: MoonProps) => {
  const Component = lazy(() => import(/* @vite-ignore */ url));
  return (
    <div className="bg-white rounded-lg overflow-hidden border" style={{ width: props.width, height: props.height }}>
      <ErrorBoundary fallback={<p className="m-3">Something went wrong</p>}>
        <Suspense fallback={<p>Loading</p>}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const MoonWrapper = ({ name, url, ...props }: MoonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) return <Moon name={name} url={url} {...props} />;

  return (
    <button
      className="px-2 py-1 rounded-md bg-white text-black hover:bg-neutral-100 border"
      onClick={() => setIsOpen(true)}
    >
      Load {name}
    </button>
  );
};

export default MoonWrapper;
