import { forwardRef } from 'react';

import Wrapper from './components/Wrapper';
import Items from './components/Items';
import Lines from './components/Lines';

import { Provider, type ProviderHandle, type ProviderProps } from './lib/state';
import { Side } from './lib/types';

import './index.css';

type IoProps = Omit<ProviderProps, 'children'> & {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
};

const Io = forwardRef<ProviderHandle, IoProps>(({ width = '100%', height = '100%', ...props }, ref) => {
  return (
    <Provider ref={ref} {...props}>
      <div id={`io-${props.id}`} style={{ width, height }}>
        <Wrapper>
          <Items items={props.data.left.items} side={Side.Left} />

          <Lines />

          <Items items={props.data.right.items} side={Side.Right} />
        </Wrapper>
      </div>
    </Provider>
  );
});

export default Io;
