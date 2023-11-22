import { useRef, useEffect } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import Moon, { type MoonHandle } from '../Moon';
import EditorButton from '../buttons/EditorButton';
import ResetButton from '../buttons/ResetButton';
import SubmitButton from '../buttons/SubmitButton';

import type { File, Moon as _Moon, Planet as _Planet } from '../../lib/types';
import { cn } from '../../lib/helpers';
import { useFiles, usePoints } from '../../lib/store';

type Planet = _Planet & {
  version: number;
};

const usePlanet = () => {
  const version = useFiles((state) => state.version);
  const find = (file: File) => file.key === 'planets/jupiter/_planet.json';
  const ref = useRef(useFiles.getState().files.find(find));
  useEffect(() => useFiles.subscribe((state) => (ref.current = state.files.find(find))), []);
  return { version, ...JSON.parse(ref.current?.body || '{}') } as Planet;
};

const Jupiter = () => {
  const planet = usePlanet();
  const saveFile = useFiles((state) => state.save);
  const savePoints = usePoints((state) => state.save);

  const smallRef = useRef<MoonHandle>(null);
  const mediumRef = useRef<MoonHandle>(null);
  const largeRef = useRef<MoonHandle>(null);

  const handleSnapshot = (id: _Moon['id'], { files, points }: ReturnType<Required<MoonHandle>['snapshot']>) => {
    for (let file of files) saveFile(file.key, file.body);
    savePoints(id, points);
  };

  const handleSubmit = () => {
    if (smallRef.current?.snapshot) handleSnapshot(planet.small.id, smallRef.current.snapshot());
    if (mediumRef.current?.snapshot) handleSnapshot(planet.medium.id, mediumRef.current.snapshot());
    if (largeRef.current?.snapshot) handleSnapshot(planet.large.id, largeRef.current.snapshot());
  };

  const parent = {
    id: planet.id,
  };

  return (
    <PanelGroup key={planet.version} id="planet" direction="horizontal">
      {(planet.small.active || planet.medium.active) && (
        <>
          <Panel id="planet-side" order={1} defaultSizePixels={400} minSizePixels={100} collapsible>
            <PanelGroup id="planet-side-inner" direction="vertical" className="pl-1">
              {planet.medium.active && (
                <Panel id="planet-moons-medium" order={1} collapsible minSizePixels={100}>
                  <div className="p-1 pt-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200/50">
                      <Moon
                        ref={mediumRef}
                        parent={parent}
                        moon={planet.medium}
                        onPublish={(action: string, data: any) => {
                          smallRef.current?.execute?.(action, data);
                          largeRef.current?.execute?.(action, data);
                        }}
                      />
                    </div>
                  </div>
                </Panel>
              )}
              {planet.small.active && planet.medium.active && (
                <PanelResizeHandle className="flex items-center justify-center data-[resize-handle-active]:[--size:calc(100%-theme(spacing.2))] relative before:content-[''] before:absolute before:-top-3 before:left-1 before:h-7 before:w-[calc(100%-theme(spacing.2))] before:z-10">
                  <div className="w-[var(--size,theme(spacing.12))] h-1 rounded-full bg-neutral-300 transition-all" />
                </PanelResizeHandle>
              )}
              {planet.small.active && (
                <Panel id="planet-moons-small" order={2} defaultSizePixels={400} collapsible minSizePixels={100}>
                  <div className="p-1 pb-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200/50">
                      <Moon
                        ref={smallRef}
                        parent={parent}
                        moon={planet.small}
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
          {(({ actions, ...moon }) => (
            <div
              className={cn(
                'h-full w-full',
                planet.large.actions?.active &&
                  'flex flex-col bg-neutral-50 rounded-lg overflow-hidden shadow-sm border border-neutral-200/50',
              )}
            >
              <div className="flex-1 flex justify-center min-w-[768px] flex-shrink-0 shadow-sm bg-white z-10 relative h-full border-b border-neutral-200/50">
                <Moon
                  ref={largeRef}
                  parent={parent}
                  moon={moon}
                  onPublish={(action: string, data: any) => {
                    smallRef.current?.execute?.(action, data);
                    mediumRef.current?.execute?.(action, data);
                  }}
                />
              </div>
              {actions?.active && (
                <div className="flex justify-between gap-2 p-2">
                  <div className="flex gap-2">
                    <EditorButton />
                    {actions.reset && (
                      <ResetButton
                        onClick={() => {
                          smallRef.current?.execute?.('reset');
                          mediumRef.current?.execute?.('reset');
                          largeRef.current?.execute?.('reset');
                        }}
                      />
                    )}
                  </div>
                  <div className="flex gap-2">{actions.submit && <SubmitButton onClick={handleSubmit} />}</div>
                </div>
              )}
            </div>
          ))(planet.large)}
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default Jupiter;
