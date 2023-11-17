import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import Button from './Button';
import EditButton from './EditButton';
import ResetButton from './ResetButton';
import SubmitButton from './SubmitButton';

import { cn } from '../lib/helpers';

type LayoutProps = {
  small?: {
    component: React.ReactNode | null;
  };
  medium?: {
    component: React.ReactNode | null;
  };
  large: {
    component: React.ReactNode;
    actions?: {
      active?: boolean;
      reset?: boolean;
      submit?: boolean;
      next?: boolean;
    };
  };
};

const Layout = ({ small, medium, large }: LayoutProps) => {
  return (
    <PanelGroup direction="horizontal">
      {(small || medium) && (
        <>
          <Panel defaultSizePixels={400} minSizePixels={100} collapsible>
            <PanelGroup direction="vertical" className="pl-1">
              {medium && (
                <Panel collapsible minSizePixels={100}>
                  <div className="p-1 pt-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden">
                      {medium.component}
                    </div>
                  </div>
                </Panel>
              )}
              {small && medium && (
                <PanelResizeHandle className="flex items-center justify-center data-[resize-handle-active]:[--size:calc(100%-theme(spacing.2))] relative before:content-[''] before:absolute before:-top-3 before:left-1 before:h-7 before:w-[calc(100%-theme(spacing.2))] before:z-10">
                  <div className="w-[var(--size,theme(spacing.12))] h-1 rounded-full bg-neutral-300 transition-all" />
                </PanelResizeHandle>
              )}
              {small && (
                <Panel defaultSizePixels={400} collapsible minSizePixels={100}>
                  <div className="p-1 pb-2 h-full w-full">
                    <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-hidden">{small.component}</div>
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
      <Panel collapsible minSizePixels={100}>
        <div className="p-2 pl-1 h-full w-full">
          <div
            className={cn(
              'h-full w-full',
              large.actions?.active && 'flex flex-col bg-neutral-50 rounded-lg overflow-hidden p-2 shadow-sm',
            )}
          >
            <div className="flex-1 flex justify-center min-w-[768px] flex-shrink-0 shadow-sm bg-white z-10 relative rounded-md overflow-hidden h-full">
              {large.component}
            </div>
            {large.actions?.active && (
              <div className="flex justify-between pt-2 gap-2">
                <div className="flex gap-2">
                  <EditButton />
                  {large.actions.reset && <ResetButton />}
                </div>
                <div className="flex gap-2">
                  {large.actions.submit && <SubmitButton />}
                  {large.actions.next && (
                    <Button
                      shadowClassName="bg-blue-600"
                      contentClassName="bg-blue-500 text-white px-4 py-2 font-medium text-sm"
                    >
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

export default Layout;
