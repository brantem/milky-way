import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import Moon, { type MoonHandle } from '../Moon';
import ResetButton from '../buttons/ResetButton';
import SubmitButton from '../buttons/SubmitButton';

import { type Moon as _Moon, type Jupiter } from '../../types';
import { cn } from '../../lib/helpers';
import { files, moons, points } from '../../lib/state';
import { usePlanet } from '../../lib/hooks';

const isMoonActive = (moon?: _Moon & { active?: boolean }) => {
  if (!moon) return false;
  if ('active' in moon) return moon.active === true;
  return true;
};

const Jupiter = () => {
  const planet = usePlanet<Jupiter>();

  const handleSnapshot = (id: _Moon['id'], data: Awaited<ReturnType<Required<MoonHandle>['snapshot']>>) => {
    for (const file of data.files) files.save(file.key, file.body);
    points.save(id, data.points);
  };

  const isSideActive = isMoonActive(planet.small) || isMoonActive(planet.medium);

  return (
    <PanelGroup id="jupiter" direction="horizontal" className="p-1 bg-neutral-100">
      {isSideActive && (
        <>
          <Panel id="jupiter-side" order={1} defaultSizePixels={400} minSizePixels={100} collapsible>
            <PanelGroup id="jupiter-side-inner" direction="vertical" className="pl-1">
              {isMoonActive(planet.medium) && (
                <Panel id="jupiter-moons-medium" order={1} collapsible minSizePixels={100}>
                  <div className="p-1 pt-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200/50">
                      <Moon moon={planet.medium!} />
                    </div>
                  </div>
                </Panel>
              )}
              {isMoonActive(planet.small) && isMoonActive(planet.medium) && (
                <PanelResizeHandle className="flex items-center justify-center data-[resize-handle-active]:[--size:calc(100%-theme(spacing.2))] relative before:content-[''] before:absolute before:-top-3 before:left-1 before:h-7 before:w-[calc(100%-theme(spacing.2))] before:z-10">
                  <div className="w-[var(--size,theme(spacing.12))] h-1 rounded-full bg-neutral-300 transition-all" />
                </PanelResizeHandle>
              )}
              {isMoonActive(planet.small) && (
                <Panel id="jupiter-moons-small" order={2} defaultSizePixels={400} collapsible minSizePixels={100}>
                  <div className="p-1 pb-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200/50">
                      <Moon moon={planet.small!} />
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
      <Panel id="jupiter-moons-large" order={2} collapsible minSizePixels={100}>
        <div className={cn('p-2 h-full w-full', isSideActive && 'pl-1')}>
          {(({ actions, ...moon }) => (
            <div
              className={cn(
                'h-full w-full',
                planet.large.actions?.active &&
                  'flex flex-col bg-neutral-50 rounded-lg overflow-hidden shadow-sm border border-neutral-200/50',
              )}
            >
              <div className="flex-1 flex justify-center min-w-[768px] flex-shrink-0 shadow-sm bg-white z-10 relative h-full border-b border-neutral-200/50">
                <Moon moon={moon} />
              </div>
              {actions?.active && (
                <div className="grid grid-cols-2 gap-2 p-2">
                  {actions.reset && <ResetButton onClick={async () => await moons.publish('reset')} />}
                  <div className="flex justify-end">
                    {actions.submit && (
                      <SubmitButton
                        onClick={async () => {
                          const keys = [];
                          const promises = [];
                          for (const key of moons.refs.keys()) {
                            const ref = moons.refs.get(key);
                            if (!ref) continue;
                            if (!ref.snapshot) continue;
                            keys.push(key);
                            promises.push(ref.snapshot());
                          }

                          const snapshots = await Promise.all(promises);
                          for (let i = 0; i < snapshots.length; i++) {
                            handleSnapshot(keys[i], snapshots[i]);
                          }
                        }}
                      />
                    )}
                  </div>
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
