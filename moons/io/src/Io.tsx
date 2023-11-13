import { forwardRef } from 'react';

import Wrapper from './components/Wrapper';
import Items from './components/Items';
import Lines from './components/Lines';

import { AppProvider, type AppProviderHandle, type AppProviderProps } from './lib/state';
import { type Item, Side } from './lib/types';

import './index.css';

type AppProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  data: {
    left: Item[];
    right: Item[];
  };
};

const App = ({ data, height, width }: IoProps) => {
  return (
    <div id="io" style={{ height, width }}>
      <Wrapper>
        <Items items={data.left} side={Side.Left} />

        <Lines />

        <Items items={data.right} side={Side.Right} />
      </Wrapper>
    </div>
  );
};

type IoProps = AppProps & Omit<AppProviderProps, 'children'>;

const Io = forwardRef<AppProviderHandle, IoProps>((props, ref) => {
  return (
    <AppProvider ref={ref} {...props}>
      <App {...props} />
    </AppProvider>
  );
});

export default Io;
