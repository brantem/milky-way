import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import Deimos from './moons/Deimos';
import Phobos from './moons/Phobos';
import Moon from './Moon';
import Button from './Button';
import EditorButton from './EditorButton';
import ResetButton from './ResetButton';
import SubmitButton from './SubmitButton';

import { cn } from '../lib/helpers';
import { useStore } from '../lib/store';

const Planet = () => {
  const planet = useStore((state) => state.planet);

  return (
    <PanelGroup id="planet" direction="horizontal">
      {(planet.small || planet.medium) && (
        <>
          <Panel id="planet-moons" order={1} defaultSizePixels={400} minSizePixels={100} collapsible>
            <PanelGroup id="planet-moons-group" direction="vertical" className="pl-1">
              {planet.medium && (
                <Panel id="planet-moons-medium" order={1} collapsible minSizePixels={100}>
                  <div className="p-1 pt-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden">
                      {/* TODO: replace this with moon */}
                      <Phobos data={planet.medium.data as any} />
                    </div>
                  </div>
                </Panel>
              )}
              {planet.small && planet.medium && (
                <PanelResizeHandle className="flex items-center justify-center data-[resize-handle-active]:[--size:calc(100%-theme(spacing.2))] relative before:content-[''] before:absolute before:-top-3 before:left-1 before:h-7 before:w-[calc(100%-theme(spacing.2))] before:z-10">
                  <div className="w-[var(--size,theme(spacing.12))] h-1 rounded-full bg-neutral-300 transition-all" />
                </PanelResizeHandle>
              )}
              {planet.small && (
                <Panel id="planet-moons-small" order={2} defaultSizePixels={400} collapsible minSizePixels={100}>
                  <div className="p-1 pb-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden">
                      {/* TODO: replace this with moon */}
                      <Deimos data={planet.small.data as any} />
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
              planet.large.actions?.active &&
                'flex flex-col gap-2 bg-neutral-50 rounded-lg overflow-hidden p-2 shadow-sm',
            )}
          >
            <div className="flex-1 flex justify-center min-w-[768px] flex-shrink-0 shadow-sm bg-white z-10 relative rounded-md overflow-hidden h-full">
              <Moon
                url={planet.large.url}
                width={planet.large.width}
                height={planet.large.height}
                data={planet.large.data}
                onChange={(data, points) => console.log(data, points)}
              />
            </div>
            {planet.large.actions?.active && (
              <div className="flex justify-between gap-2">
                <div className="flex gap-2">
                  <EditorButton />
                  {planet.large.actions.reset && <ResetButton />}
                </div>
                <div className="flex gap-2">
                  {planet.large.actions.submit && <SubmitButton />}
                  {planet.large.actions.next && (
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
