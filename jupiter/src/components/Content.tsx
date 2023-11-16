import { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import Moon from './Moon';

const ResetButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      type="reset"
      className="aspect-square bg-red-500 text-white rounded-lg h-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
      onClick={() => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 250);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={[
          'w-5 h-5 [animation-duration:0.25s] [animation-easing-function:ease-in-out]',
          isClicked ? 'animate-spin' : '',
        ].join(' ')}
      >
        <path
          fillRule="evenodd"
          d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

const Content = () => {
  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSizePixels={400} minSizePixels={100} collapsible>
        <PanelGroup direction="vertical" className="pl-1">
          <Panel collapsible minSizePixels={100}>
            <div className="p-1 pt-2 h-full w-full">
              <div className="h-full w-full bg-white shadow-sm rounded-lg overflow-auto p-2 flex justify-center">
                <div className="prose prose-neutral">
                  <p>
                    Laboris esse officia cupidatat et officia elit pariatur laboris tempor adipisicing eiusmod pariatur
                    officia. In nostrud commodo elit incididunt consectetur minim. Non sunt excepteur amet. Ipsum ad
                    dolore in ut labore eiusmod deserunt mollit cillum pariatur ipsum. Sit est mollit occaecat elit nisi
                    aliqua Lorem. Laboris mollit culpa minim ut sint ipsum aliquip cillum exercitation nisi est esse
                    quis sit esse. Irure elit nostrud esse enim cupidatat in.
                  </p>
                  <p>
                    Tempor aliquip non qui veniam ea consectetur consectetur et sunt. Magna laboris tempor ut do veniam
                    consequat magna magna dolor nisi. Adipisicing anim cillum deserunt occaecat minim proident non
                    excepteur. Nulla ipsum veniam fugiat deserunt mollit aute laborum do sit cillum anim. Do occaecat ut
                    aliqua. Do laborum enim id dolore do irure fugiat qui reprehenderit ut incididunt amet ad quis.
                  </p>
                  <p>
                    Incididunt non magna nulla eiusmod exercitation esse dolore quis nostrud qui qui. In enim
                    exercitation incididunt eiusmod incididunt sit enim mollit est irure. Sit exercitation eu voluptate
                    aute eu nulla ad duis ullamco ipsum. Commodo mollit aliquip voluptate duis exercitation minim Lorem
                    labore ullamco non magna exercitation consectetur excepteur eu.
                  </p>
                  <p>
                    Commodo eiusmod exercitation deserunt dolor fugiat. Fugiat cillum cillum cillum elit tempor qui
                    irure officia id fugiat eu. Fugiat tempor irure in excepteur cupidatat consectetur nulla eiusmod qui
                    adipisicing labore qui. Anim sint nisi amet aute ullamco sit nulla Lorem reprehenderit aliqua nisi
                    est sunt.
                  </p>
                </div>
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="flex items-center justify-center">
            <div className="w-12 h-1 rounded-full bg-neutral-300 transition-all" />
          </PanelResizeHandle>
          <Panel defaultSizePixels={400} collapsible minSizePixels={100}>
            <div className="p-1 pb-2 h-full w-full">
              <div className="h-full w-full bg-sky-50 shadow-sm rounded-lg overflow-y-auto">
                <ol className="list-none divide-y">
                  <li className="relative py-3 px-2 min-h-[theme(spacing.16)] overflow-hidden">
                    <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-sky-200/50 leading-none italic select-none">
                      1
                    </span>
                    <span className="relative z-10 text-sky-900">
                      Exercitation ad dolore anim duis pariatur ipsum aute do nostrud irure eiusmod est mollit aute
                      officia.
                    </span>
                  </li>
                  <li className="relative py-2 px-3 min-h-[theme(spacing.16)] overflow-hidden">
                    <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-sky-200/50 leading-none italic select-none">
                      2
                    </span>
                    <span className="relative z-10 text-sky-900">
                      Ipsum dolore ullamco eiusmod officia in aute fugiat nisi excepteur cupidatat elit aliqua laboris.
                    </span>
                  </li>
                  <li className="relative py-2 px-3 min-h-[theme(spacing.16)] !border-b overflow-hidden">
                    <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-sky-200/50 leading-none italic select-none">
                      3
                    </span>
                    <span className="relative z-10 text-sky-900">
                      Exercitation velit irure excepteur enim aliquip eiusmod veniam do sint ipsum pariatur commodo
                      irureesse do.
                    </span>
                  </li>
                  <li className="relative py-2 px-3 min-h-[theme(spacing.16)] !border-b overflow-hidden">
                    <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-sky-200/50 leading-none italic select-none">
                      4
                    </span>
                    <span className="relative z-10 text-sky-900">Lorem ullamco Lorem ea.</span>
                  </li>
                  <li className="relative py-2 px-3 min-h-[theme(spacing.16)] !border-b overflow-hidden">
                    <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-sky-200/50 leading-none italic select-none">
                      5
                    </span>
                    <span className="relative z-10 text-sky-900">
                      Officia non non amet magna occaecat ullamco magna deserunt culpa in fugiat eu quis sunt.
                    </span>
                  </li>
                  <li className="relative py-2 px-3 min-h-[theme(spacing.16)] !border-b overflow-hidden">
                    <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-sky-200/50 leading-none italic select-none">
                      6
                    </span>
                    <span className="relative z-10 text-sky-900">Labore labore pariatur do deserunt sint.</span>
                  </li>
                </ol>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle className="flex items-center justify-center">
        <div className="h-12 w-1 rounded-full bg-neutral-300 transition-all" />
      </PanelResizeHandle>
      <Panel collapsible minSizePixels={100}>
        <div className="p-2 pl-1 h-full w-full">
          <div className="flex flex-col bg-neutral-50 shadow-sm rounded-lg h-full w-full overflow-hidden">
            <div className="flex-1 flex justify-center min-w-[768px] flex-shrink-0 shadow-sm bg-white z-10 relative rounded-lg">
              <Moon
                url="https://moons.brantem.com/callisto/bundle.js"
                width="100%"
                height="100%"
                data={{
                  text: "Every morning, I like to start my day with a healthy __1__. I usually have a bowl of __2__ topped with fresh __3__, a sprinkle of __4__, and a drizzle of __5__. It's the perfect way to energize myself for the day ahead.",
                  choices: [
                    { id: '1', text: 'breakfast' }, //__1__
                    { id: '2', text: 'oatmeal' }, // __2__
                    { id: '3', text: 'strawberries' }, // __3__
                    { id: '4', text: 'honey' }, // __4__
                    { id: '5', text: 'milk' }, // __5__
                    { id: '6', text: 'coal' },
                  ],
                }}
                onChange={(data, points) => console.log(data, points)}
              />
            </div>
            <div className="flex justify-between p-2 gap-2">
              <ResetButton />
              <button className="bg-neutral-800 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-shadow">
                Submit
              </button>
            </div>
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default Content;
