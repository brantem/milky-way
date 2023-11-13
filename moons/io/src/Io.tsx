import Wrapper from './components/Wrapper';
import Items from './components/Items';
import Lines from './components/Lines';

import { AppProvider } from './lib/state';
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

type IoProps = AppProps;

const Io = (props: IoProps) => {
  return (
    <AppProvider {...props}>
      <App {...props} />
    </AppProvider>
  );
};

export default Io;
