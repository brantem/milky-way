import { create } from 'zustand';

import type { File, Moon } from './types';

type Moons = {
  small?: Moon;
  medium?: Moon;
  large: Moon & {
    actions: {
      active?: boolean;
      reset?: boolean;
      submit?: boolean;
    };
  };
};

interface State {
  files: File[];
  moons: Moons;
  updateMoons(moons: Moons): void;

  isEditorOpen: boolean;
  toggleEditor(): void;
}

type a = JSX.IntrinsicElements;

export const useStore = create<State>()((set) => ({
  files: [
    {
      key: 'content.md',
      body: 'Laboris esse officia cupidatat et officia elit pariatur laboris tempor adipisicing eiusmod pariatur officia. In nostrud commodo elit incididunt consectetur minim. Non sunt excepteur amet. Ipsum ad dolore in ut labore eiusmod deserunt mollit cillum pariatur ipsum. Sit est mollit occaecat elit nisi aliqua Lorem. Laboris mollit culpa minim ut sint ipsum aliquip cillum exercitation nisi est esse quis sit esse. Irure elit nostrud esse enim cupidatat in.\n\nTempor aliquip non qui veniam ea consectetur consectetur et sunt. Magna laboris tempor ut do veniam consequat magna magna dolor nisi. Adipisicing anim cillum deserunt occaecat minim proident non excepteur. Nulla ipsum veniam fugiat deserunt mollit aute laborum do sit cillum anim. Do occaecat ut aliqua. Do laborum enim id dolore do irure fugiat qui reprehenderit ut incididunt amet ad quis.',
    },
    {
      key: 'tests.json',
      body: '[{"text":"Draw a square with any color","data":{"label":"square"}},{"text":"Draw a triangle with [](color://#ef4444)","data":{"label":"triangle","color":"#ef4444"}}]',
    },
  ],
  moons: {
    small: {
      url: 'https://moons.brantem.com/deimos/bundle.js',
      data: {
        file: 'tests.json',
      },
    },
    medium: {
      url: 'https://moons.brantem.com/phobos/bundle.js',
      data: {
        file: 'content.md',
      },
    },
    large: {
      url: 'https://moons.brantem.com/ganymede/bundle.js',
      data: {
        file: 'tests.json',
        model: {
          type: 'teachable_machine',
          urls: {
            baseUrl: 'https://raw.githubusercontent.com/brantem/adudu/master/shapes',
          },
          input: {
            width: 96,
            height: 96,
            background: '#fff',
          },
        },
      },

      // url: "https://moons.brantem.com/callisto/bundle.js",
      // data: {
      //   text: "Every morning, I like to start my day with a healthy __1__. I usually have a bowl of __2__ topped with fresh __3__, a sprinkle of __4__, and a drizzle of __5__. It's the perfect way to energize myself for the day ahead.",
      //   choices: [
      //     { id: '1', text: 'breakfast' },
      //     { id: '2', text: 'oatmeal' },
      //     { id: '3', text: 'strawberries' },
      //     { id: '4', text: 'honey' },
      //     { id: '5', text: 'milk' },
      //     { id: '6', text: 'coal' },
      //   ],
      // }

      // url: 'https://moons.brantem.com/io/bundle.js',
      // data: {
      //   left: {
      //     items: [
      //       { id: '1', text: 'Square' },
      //       { id: '2', text: 'Japan' },
      //       { id: '3', text: 'Mars' },
      //       { id: '4', text: 'Leonardo da Vinci' },
      //       { id: '5', text: 'Broccoli' },
      //     ],
      //     shuffle: true,
      //   },
      //   right: {
      //     items: [
      //       { id: '1', text: 'Four equal sides' },
      //       { id: '2', text: 'Tokyo' },
      //       { id: '3', text: 'Phobos' },
      //       { id: '4', text: 'Mona Lisa' },
      //       { id: '5', text: 'Vegetable' },
      //     ],
      //     shuffle: true,
      //   },
      // },
      actions: {
        active: true,
        reset: true,
        submit: true,
      },
      debug: true,
    },
  },
  updateMoons(moons) {
    set({ moons });
  },

  isEditorOpen: false,
  toggleEditor() {
    set((state) => ({ isEditorOpen: !state.isEditorOpen }));
  },
}));
