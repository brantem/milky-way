import Wrapper from './components/Wrapper';
import Items from './components/Items';
import Lines from './components/Lines';

import { AppProvider } from './lib/state';
import { Side } from './lib/types';

import './index.css';

type AppProps = {
  height?: React.CSSProperties['height'];
  width?: React.CSSProperties['width'];
  left: string[];
  right: string[];
};

const App = ({ left, right, height, width }: IoProps) => {
  return (
    <div id="io" style={{ height, width }}>
      <Wrapper>
        <Items items={left} side={Side.Left} />

        <Lines />

        <Items items={right} side={Side.Right} />
      </Wrapper>
    </div>
  );
};

type IoProps = AppProps;

const Io = (props: IoProps) => {
  return (
    <AppProvider {...props}>
      <App {...props} />
    </AppProvider>
  );
};

export default Io;
