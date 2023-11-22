import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';

import type { File, Moon, Jupiter } from '../types';

const ROOT = 'planets/';

interface State {
  version: number;
  incrementVersion(): void;

  files: File[];
  save(key: File['key'], body: File['body']): File;
  delete(key: File['key']): void;
}

export const useFiles = create<State, [['zustand/persist', Pick<State, 'files'>]]>(
  persist(
    (set) => ({
      version: 0,
      incrementVersion() {
        set((state) => ({ version: state.version + 1 }));
      },

      files: [
        {
          key: 'planets/jupiter/_planet.json',
          body: JSON.stringify(
            {
              id: nanoid(),
              small: {
                id: 'deimos',
                active: true,
                url: 'https://moons.brantem.com/deimos/bundle.js',
                files: ['planets/jupiter/tests.json', 'planets/jupiter/outputs/deimos.json'],
                data: {
                  tasks: {
                    file: 'planets/jupiter/tests.json',
                    output: 'planets/jupiter/outputs/deimos.json',
                  },
                },
              },
              medium: {
                id: 'phobos',
                active: true,
                url: 'https://moons.brantem.com/phobos/bundle.js',
                files: ['planets/jupiter/content.md'],
                data: {
                  content: {
                    file: 'planets/jupiter/content.md',
                  },
                },
              },
              large: {
                id: 'io',
                url: 'https://moons.brantem.com/io/bundle.js',
                files: ['planets/jupiter/outputs/io.json'],
                data: {
                  initial: {
                    file: 'planets/jupiter/outputs/io.json',
                  },
                  output: {
                    file: 'planets/jupiter/outputs/io.json',
                  },
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
            } satisfies Jupiter,
            null,
            2,
          ),
        },
        {
          key: 'planets/jupiter/content.md',
          body: 'Laboris esse officia cupidatat et officia elit pariatur laboris tempor adipisicing eiusmod pariatur officia. In nostrud commodo elit incididunt consectetur minim. Non sunt excepteur amet. Ipsum ad dolore in ut labore eiusmod deserunt mollit cillum pariatur ipsum. Sit est mollit occaecat elit nisi aliqua Lorem. Laboris mollit culpa minim ut sint ipsum aliquip cillum exercitation nisi est esse quis sit esse. Irure elit nostrud esse enim cupidatat in.\n\nTempor aliquip non qui veniam ea consectetur consectetur et sunt. Magna laboris tempor ut do veniam consequat magna magna dolor nisi. Adipisicing anim cillum deserunt occaecat minim proident non excepteur. Nulla ipsum veniam fugiat deserunt mollit aute laborum do sit cillum anim. Do occaecat ut aliqua. Do laborum enim id dolore do irure fugiat qui reprehenderit ut incididunt amet ad quis.',
        },
        {
          key: 'planets/jupiter/tests.json',
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
        {
          key: 'planets/jupiter/examples/callisto.json',
          body: JSON.stringify(
            {
              id: 'callisto',
              url: 'https://moons.brantem.com/callisto/bundle.js',
              files: ['planets/jupiter/outputs/callisto.json'],
              data: {
                initial: {
                  file: 'planets/jupiter/outputs/callisto.json',
                },
                output: {
                  file: 'planets/jupiter/outputs/callisto.json',
                },
                text: 'The __1__ dog quickly dashed across the __2__, chasing its bouncing __3__. Its owner, laughing, picked up their pace to keep an eye on the lively pet. Enjoying a sunny __4__ afternoon, they continued their enjoyable __5__ in the park.',
                choices: {
                  items: [
                    { id: '1', text: 'chihuahua' },
                    { id: '2', text: 'backyard' },
                    { id: '3', text: 'ball' },
                    { id: '4', text: 'spring' },
                    { id: '5', text: 'walk' },
                    { id: '6', text: 'grandfather' },
                  ],
                  shuffle: true,
                },
              },
            } satisfies Moon,
            null,
            2,
          ),
        },
        {
          key: 'planets/jupiter/examples/ganymede.json',
          body: JSON.stringify(
            {
              id: 'ganymede',
              url: 'https://moons.brantem.com/ganymede/bundle.js',
              files: [
                'planets/jupiter/tests.json',
                'planets/jupiter/outputs/ganymede.json',
                'planets/jupiter/outputs/deimos.json',
              ],
              data: {
                initial: {
                  file: 'planets/jupiter/outputs/ganymede.json',
                },
                tests: {
                  file: 'planets/jupiter/tests.json',
                },
                output: {
                  file: 'planets/jupiter/outputs/ganymede.json',
                  deimos: 'planets/jupiter/outputs/deimos.json',
                },
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
                  probability: {
                    min: 90,
                    max: 100,
                  },
                },
              },
            },
            null,
            2,
          ),
        },
        {
          key: 'planets/jupiter/examples/io.json',
          body: JSON.stringify(
            {
              id: 'io',
              url: 'https://moons.brantem.com/io/bundle.js',
              files: ['planets/jupiter/outputs/io.json'],
              data: {
                initial: {
                  file: 'planets/jupiter/outputs/io.json',
                },
                output: {
                  file: 'planets/jupiter/outputs/io.json',
                },
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
            },
            null,
            2,
          ),
        },
      ],
      save(key, body) {
        const file = { key: ROOT + key.trim().replace(new RegExp(`^${ROOT.replace('/', '/')}`), ''), body };
        set((state) => {
          const index = state.files.findIndex((file) => file.key === key);
          if (index === -1) return { files: [...state.files, file] };
          const files = state.files.slice();
          files[index].body = body;
          return { files };
        });
        return file;
      },
      delete(key) {
        set((state) => ({ files: state.files.filter((file) => file.key !== key) }));
      },
    }),
    {
      name: 'files',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ files: state.files }),
    },
  ),
);
