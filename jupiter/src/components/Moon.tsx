import { Suspense, useState, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type MoonProps = {
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
    <ErrorBoundary fallback={<p className="m-3">Something went wrong</p>}>
      <Suspense fallback={<p>Loading</p>}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Moon;
