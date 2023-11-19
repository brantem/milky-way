import { useRef } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import Moon, { type MoonHandle } from './Moon';
import Button from './Button';
import EditorButton from './buttons/EditorButton';
import ResetButton from './buttons/ResetButton';
import SubmitButton from './buttons/SubmitButton';

import { cn } from '../lib/helpers';
import { useStore } from '../lib/store';

const Planet = () => {
  const moons = useStore((state) => state.moons);
  const smallRef = useRef<MoonHandle>(null);
  const mediumRef = useRef<MoonHandle>(null);
  const largeRef = useRef<MoonHandle>(null);

  return (
    <PanelGroup id="planet" direction="horizontal">
      {(moons.small || moons.medium) && (
        <>
          <Panel id="planet-side" order={1} defaultSizePixels={400} minSizePixels={100} collapsible>
            <PanelGroup id="planet-side-inner" direction="vertical" className="pl-1">
              {moons.medium && (
                <Panel id="planet-moons-medium" order={1} collapsible minSizePixels={100}>
                  <div className="p-1 pt-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden">
                      <Moon
                        ref={mediumRef}
                        moon={moons.medium}
                        onChange={(data, points) => console.log(data, points)}
                        onPublish={(action: string, data: any) => {
                          smallRef.current?.execute?.(action, data);
                          largeRef.current?.execute?.(action, data);
                        }}
                      />
                    </div>
                  </div>
                </Panel>
              )}
              {moons.small && moons.medium && (
                <PanelResizeHandle className="flex items-center justify-center data-[resize-handle-active]:[--size:calc(100%-theme(spacing.2))] relative before:content-[''] before:absolute before:-top-3 before:left-1 before:h-7 before:w-[calc(100%-theme(spacing.2))] before:z-10">
                  <div className="w-[var(--size,theme(spacing.12))] h-1 rounded-full bg-neutral-300 transition-all" />
                </PanelResizeHandle>
              )}
              {moons.small && (
                <Panel id="planet-moons-small" order={2} defaultSizePixels={400} collapsible minSizePixels={100}>
                  <div className="p-1 pb-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden">
                      <Moon
                        ref={smallRef}
                        moon={moons.small}
                        onChange={(data, points) => console.log(data, points)}
                        onPublish={(action: string, data: any) => {
                          mediumRef.current?.execute?.(action, data);
                          largeRef.current?.execute?.(action, data);
                        }}
                      />
                    </div>
                  </div>
                </Panel>
              )}
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="flex items-center justify-center data-[resize-handle-active]:[--size:calc(100%-theme(spacing.4))] relative before:content-[''] before:absolute before:top-2 before:-right-2 before:w-5 before:h-[calc(100%-theme(spacing.4))] before:z-10">
            <div className="h-[var(--size,theme(spacing.12))] w-1 rounded-full bg-neutral-300 transition-all" />
          </PanelResizeHandle>
        </>
      )}
      <Panel id="planet-moons-large" order={2} collapsible minSizePixels={100}>
        <div className="p-2 pl-1 h-full w-full">
          <div
            className={cn(
              'h-full w-full',
              moons.large.actions?.active && 'flex flex-col bg-neutral-50 rounded-lg overflow-hidden shadow-sm',
            )}
          >
            <div className="flex-1 flex justify-center min-w-[768px] flex-shrink-0 shadow-sm bg-white z-10 relative h-full">
              <Moon
                ref={largeRef}
                moon={moons.large}
                onChange={(data, points) => console.log(data, points)}
                onPublish={(action: string, data: any) => {
                  smallRef.current?.execute?.(action, data);
                  mediumRef.current?.execute?.(action, data);
                }}
              />
            </div>
            {moons.large.actions?.active && (
              <div className="flex justify-between gap-2 p-2">
                <div className="flex gap-2">
                  <EditorButton />
                  {moons.large.actions.reset && (
                    <ResetButton
                      onClick={() => {
                        smallRef.current?.execute?.('reset');
                        mediumRef.current?.execute?.('reset');
                        largeRef.current?.execute?.('reset');
                      }}
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  {moons.large.actions.submit && (
                    <SubmitButton
                      onClick={() => {
                        if (smallRef.current?.snapshot) console.log('small', smallRef.current.snapshot());
                        if (mediumRef.current?.snapshot) console.log('medium', mediumRef.current.snapshot());
                        if (largeRef.current?.snapshot) console.log('large', largeRef.current.snapshot());
                      }}
                    />
                  )}
                  {moons.large.actions.next && (
                    <Button shadowClassName="bg-sky-600" contentClassName="bg-sky-500 text-white px-4 py-2">
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default Planet;
