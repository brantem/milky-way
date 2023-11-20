import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { File } from './types';

interface State {
  files: File[];
  saveFile(key: File['key'], body: File['body']): void;
  deleteFile(key: File['key']): void;

  isEditorOpen: boolean;
  toggleEditor(): void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      files: [
        {
          key: 'planet.json',
          body: JSON.stringify(
            {
              small: {
                url: 'https://moons.brantem.com/deimos/bundle.js',
                points: null,
                data: {
                  file: 'tests.json',
                },
              },
              medium: {
                url: 'https://moons.brantem.com/phobos/bundle.js',
                points: null,
                data: {
                  file: 'content.md',
                },
              },
              large: {
                // url: 'https://moons.brantem.com/ganymede/bundle.js',
                // maxPoints: {
                //   min: 2,
                //   max: 2,
                // },
                // data: {
                //   tests: {
                //     file: 'tests.json',
                //   },
                //   model: {
                //     type: 'teachable_machine',
                //     urls: {
                //       baseUrl: 'https://raw.githubusercontent.com/brantem/adudu/master/shapes',
                //     },
                //     input: {
                //       width: 96,
                //       height: 96,
                //       background: '#fff',
                //     },
                //   },
                // },

                // url: 'https://moons.brantem.com/callisto/bundle.js',
                // maxPoints: {
                //   min: 5,
                //   max: 5,
                // },
                // data: {
                //   text: 'The __1__ dog quickly dashed across the __2__, chasing its bouncing __3__. Its owner, laughing, picked up their pace to keep an eye on the lively pet. Enjoying a sunny __4__ afternoon, they continued their enjoyable __5__ in the park.',
                //   choices: {
                //     items: [
                //       { id: '1', text: 'chihuahua' },
                //       { id: '2', text: 'backyard' },
                //       { id: '3', text: 'ball' },
                //       { id: '4', text: 'spring' },
                //       { id: '5', text: 'walk' },
                //       { id: '6', text: 'grandfather' },
                //     ],
                //     shuffle: true,
                //   },
                // },

                url: 'https://moons.brantem.com/io/bundle.js',
                points: {
                  min: 5,
                  max: 5,
                },
                data: {
                  left: {
                    items: [
                      { id: '1', text: 'Square' },
                      { id: '2', text: 'Japan' },
                      { id: '3', text: 'Mars' },
                      { id: '4', text: 'Leonardo da Vinci' },
                      { id: '5', text: 'Broccoli' },
                    ],
                    shuffle: true,
                  },
                  right: {
                    items: [
                      { id: '1', text: 'Four equal sides' },
                      { id: '2', text: 'Tokyo' },
                      { id: '3', text: 'Phobos' },
                      { id: '4', text: 'Mona Lisa' },
                      { id: '5', text: 'Vegetable' },
                    ],
                    shuffle: true,
                  },
                },
                actions: {
                  active: true,
                  reset: true,
                  submit: true,
                },
                debug: true,
              },
            },
            null,
            2,
          ),
        },
        {
          key: 'content.md',
          body: 'Laboris esse officia cupidatat et officia elit pariatur laboris tempor adipisicing eiusmod pariatur officia. In nostrud commodo elit incididunt consectetur minim. Non sunt excepteur amet. Ipsum ad dolore in ut labore eiusmod deserunt mollit cillum pariatur ipsum. Sit est mollit occaecat elit nisi aliqua Lorem. Laboris mollit culpa minim ut sint ipsum aliquip cillum exercitation nisi est esse quis sit esse. Irure elit nostrud esse enim cupidatat in.\n\nTempor aliquip non qui veniam ea consectetur consectetur et sunt. Magna laboris tempor ut do veniam consequat magna magna dolor nisi. Adipisicing anim cillum deserunt occaecat minim proident non excepteur. Nulla ipsum veniam fugiat deserunt mollit aute laborum do sit cillum anim. Do occaecat ut aliqua. Do laborum enim id dolore do irure fugiat qui reprehenderit ut incididunt amet ad quis.',
        },
        {
          key: 'tests.json',
          body: JSON.stringify(
            [
              {
                text: 'Draw a square with any color',
                data: {
                  label: 'square',
                },
              },
              {
                text: 'Draw a triangle with [](color://#ef4444)',
                data: {
                  label: 'triangle',
                  color: '#ef4444',
                },
              },
            ],
            null,
            2,
          ),
        },
      ],
      saveFile(key, body) {
        set((state) => {
          const index = state.files.findIndex((file) => file.key === key);
          if (index === -1) return { files: [...state.files, { key, body }] };
          const files = state.files.slice();
          files[index].body = body;
          return { files };
        });
      },
      deleteFile(key) {
        set((state) => ({ files: state.files.filter((file) => file.key !== key) }));
      },

      isEditorOpen: false,
      toggleEditor() {
        set((state) => ({ isEditorOpen: !state.isEditorOpen }));
      },
    }),
    {
      name: 'planet',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ files: state.files }),
    },
  ),
);
