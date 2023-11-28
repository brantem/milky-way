import { forwardRef, useRef } from 'react';

import Wrapper from './components/Wrapper';
import Text from './components/Text';
import Choices from './components/Choices';

import { Provider, type ProviderHandle, type ProviderProps } from './lib/state';

import './index.css';

type CallistoProps = Omit<ProviderProps, 'children'> & {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
};

const Callisto = forwardRef<ProviderHandle, CallistoProps>(({ width = '100%', height = '100%', ...props }, ref) => {
  const callistoRef = useRef<HTMLDivElement>(null);

  return (
    <Provider ref={ref} {...props}>
      <div ref={callistoRef} id={`callisto-${props.id}`} style={{ width, height }}>
        <div className="relative font-sans text-4xl font-semibold h-full w-full p-6 flex flex-col">
          <Wrapper containerRef={callistoRef}>
            <div className="flex-1 mx-auto">
              <Text text={props.data.text} />
            </div>

            <Choices />
          </Wrapper>
        </div>
      </div>
    </Provider>
  );
});

export default Callisto;
