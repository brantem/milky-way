import { forwardRef } from 'react';

import Canvas from './components/Canvas';
import Renderer from './components/Renderer';
import ColorPicker from './components/ColorPicker';
import Tools from './components/Tools';

import { AppProvider, type AppProviderHandle, type AppProviderProps } from './lib/state';

import './index.css';

type AppProps = {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
};

const App = ({ width = '100%', height = '100%' }: AppProps) => {
  return (
    <div id="ganymede" style={{ width, height }}>
      <div className="relative h-full w-full bg-white overflow-hidden">
        <Canvas />
        <Renderer />
        <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center bg-white gap-4 p-2 border-solid border-0 border-t border-neutral-100 h-14">
          <ColorPicker />
          <Tools />
        </div>
      </div>
    </div>
  );
};

type GanymedeProps = AppProps & Omit<AppProviderProps, 'children'>;

const Ganymede = forwardRef<AppProviderHandle, GanymedeProps>((props, ref) => {
  return (
    <AppProvider ref={ref} {...props}>
      <App {...props} />
    </AppProvider>
  );
});

export default Ganymede;
