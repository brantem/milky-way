import { forwardRef } from 'react';

import Wrapper from './components/Wrapper';
import Items from './components/Items';
import Lines from './components/Lines';

import { AppProvider, type AppProviderHandle, type AppProviderProps } from './lib/state';
import { type Item, Side } from './lib/types';

import './index.css';

type AppProps = {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  data: {
    left: {
      items: Item[];
      shuffle?: boolean;
    };
    right: {
      items: Item[];
      shuffle?: boolean;
    };
  };
};

const App = ({ width = '100%', height = '100%', data }: IoProps) => {
  return (
    <div id="io" style={{ width, height }}>
      <Wrapper>
        <Items items={data.left.items} side={Side.Left} />

        <Lines />

        <Items items={data.right.items} side={Side.Right} />
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
