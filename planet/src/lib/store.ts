import { create } from 'zustand';

import type { Moon } from './types';

type Moons = {
  small?: Moon;
  medium?: Moon;
  large: Moon & {
    actions: {
      active?: boolean;
      reset?: boolean;
      submit?: boolean;
      next?: boolean;
    };
  };
};

interface State {
  moons: Moons;
  updateMoons(moons: Moons): void;

  isEditorOpen: boolean;
  toggleEditor(): void;
}

export const useStore = create<State>()((set) => ({
  moons: {
    small: {
      url: 'https://moons.brantem.com/deimos/bundle.js',
      data: {
        items: [
          {
            text: 'Exercitation ad dolore anim duis pariatur ipsum aute do nostrud irure eiusmod est mollit aute officia.\n\n```\nconst a = 1;\n```',
          },
          {
            text: '```\nconst a = 1;\n```\n\nIpsum dolore ullamco eiusmod officia in aute fugiat nisi excepteur cupidatat elit aliqua laboris.',
          },
          {
            text: 'Exercitation velit irure `excepteur` enim aliquip eiusmod veniam do sint **ipsum** pariatur commodo irureesse do.',
          },
          {
            text: 'Lorem *ullamco* Lorem ea.',
          },
        ],
      },
    },
    medium: {
      url: 'https://moons.brantem.com/phobos/bundle.js',
      data: {
        text: 'Laboris esse officia cupidatat et officia elit pariatur laboris tempor adipisicing eiusmod pariatur officia. In nostrud commodo elit incididunt consectetur minim. Non sunt excepteur amet. Ipsum ad dolore in ut labore eiusmod deserunt mollit cillum pariatur ipsum. Sit est mollit occaecat elit nisi aliqua Lorem. Laboris mollit culpa minim ut sint ipsum aliquip cillum exercitation nisi est esse quis sit esse. Irure elit nostrud esse enim cupidatat in.\n\nTempor aliquip non qui veniam ea consectetur consectetur et sunt. Magna laboris tempor ut do veniam consequat magna magna dolor nisi. Adipisicing anim cillum deserunt occaecat minim proident non excepteur. Nulla ipsum veniam fugiat deserunt mollit aute laborum do sit cillum anim. Do occaecat ut aliqua. Do laborum enim id dolore do irure fugiat qui reprehenderit ut incididunt amet ad quis.',
      },
    },
    large: {
      url: 'https://moons.brantem.com/ganymede/bundle.js',
      data: {
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
        tests: [
          {
            label: 'square',
          },
          {
            label: 'triangle',
            color: '#ef4444',
          },
        ],
      },
      actions: {
        active: true,
        reset: true,
        submit: true,
        next: true,
      },
    },
    // large: {
    //   url: 'https://moons.brantem.com/io/bundle.js',
    //   data: {
    //     left: [
    //       { id: '1', text: 'Square' },
    //       { id: '2', text: 'Japan' },
    //       { id: '3', text: 'Mars' },
    //       { id: '4', text: 'Leonardo da Vinci' },
    //       { id: '5', text: 'Broccoli' },
    //     ],
    //     right: [
    //       { id: '1', text: 'Four equal sides' },
    //       { id: '2', text: 'Tokyo' },
    //       { id: '3', text: 'Phobos' },
    //       { id: '4', text: 'Mona Lisa' },
    //       { id: '5', text: 'Vegetable' },
    //     ],
    //   },
    //   actions: {
    //     active: true,
    //     reset: true,
    //     submit: true,
    //     next: true,
    //   },
    // },
  },
  updateMoons(moons) {
    set({ moons });
  },

  isEditorOpen: false,
  toggleEditor() {
    set((state) => ({ isEditorOpen: !state.isEditorOpen }));
  },
}));
