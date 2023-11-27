import { proxy, subscribe, useSnapshot } from 'valtio';
import { nanoid } from 'nanoid';

import type { File, Moon, Jupiter, Neptune } from '../types';

const ROOT = 'planets/';

interface State {
  value: File[];
  save(key: File['key'], body: File['body']): File;
  delete(key: File['key']): void;
}

export const files = proxy<State>({
  value: [
    {
      key: 'planets/jupiter/_planet.json',
      body: JSON.stringify(
        {
          id: nanoid(),
          small: {
            id: 'deimos',
            active: true,
            url: 'https://moons.brantem.com/deimos/bundle.js',
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
            data: {
              content: {
                file: 'planets/jupiter/content.md',
              },
            },
          },
          large: {
            id: 'ganymede',
            url: 'https://moons.brantem.com/ganymede/bundle.js',
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

            actions: {
              active: true,
              reset: true,
              submit: true,
            },
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
      key: 'planets/jupiter/examples/deimos.json',
      body: JSON.stringify(
        {
          id: 'deimos',
          active: true,
          url: 'https://moons.brantem.com/deimos/bundle.js',
          data: {
            tasks: {
              file: 'planets/jupiter/tests.json',
              output: 'planets/jupiter/outputs/deimos.json',
            },
          },
        } satisfies Moon & { active: boolean },
        null,
        2,
      ),
    },
    {
      key: 'planets/jupiter/examples/phobos.json',
      body: JSON.stringify(
        {
          id: 'phobos',
          active: true,
          url: 'https://moons.brantem.com/phobos/bundle.js',
          data: {
            content: {
              file: 'planets/jupiter/content.md',
            },
          },
        } satisfies Moon & { active: boolean },
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
        } satisfies Moon,
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
        } satisfies Moon,
        null,
        2,
      ),
    },
    {
      key: 'planets/neptune/_planet.json',
      body: JSON.stringify(
        {
          id: nanoid(),
          moons: [
            '# Est duis culpa deserunt commodo exercitation.\n\nDolor adipisicing excepteur amet deserunt deserunt labore in tempor sint dolore anim ad consectetur id quis. Aliquip consequat cillum adipisicing ipsum eiusmod excepteur anim ullamco adipisicing esse consequat. Deserunt duis est proident aute in sunt. Laborum pariatur laboris mollit anim minim minim ullamco in ipsum sunt exercitation. Veniam ipsum cupidatat exercitation dolore cillum ex tempor nulla irure. Enim ad nostrud labore ad sint Lorem excepteur et. Do commodo est amet amet ex nulla ipsum. Minim esse sint enim ipsum ut magna mollit deserunt enim elit laborum occaecat exercitation.\n\nCillum nulla proident ipsum aliquip dolor anim sunt amet amet velit fugiat. Sint proident elit laborum exercitation eiusmod ullamco culpa excepteur eiusmod culpa. Officia sit nisi nostrud excepteur aliquip do. Cillum dolor dolore quis quis magna magna sint excepteur adipisicing non aliqua ad cillum. Deserunt sunt id sit ad mollit officia veniam reprehenderit voluptate consequat amet adipisicing sint quis. Consectetur excepteur id consequat ut sint voluptate cillum. Fugiat adipisicing minim et et magna. Proident quis ea dolor minim ipsum eiusmod enim labore est veniam minim in eiusmod mollit exercitation.\n\nCulpa eu officia esse culpa esse. Adipisicing laborum pariatur qui. Magna do deserunt Lorem deserunt excepteur. Deserunt qui nulla excepteur sint consequat excepteur reprehenderit.',
            {
              id: nanoid(),
              url: 'https://moons.brantem.com/callisto/bundle.js',
              height: 512,
              data: {
                initial: {
                  file: 'planets/neptune/outputs/callisto-1.json',
                },
                output: {
                  file: 'planets/neptune/outputs/callisto-1.json',
                },
                text: 'The __1__ dog quickly dashed across the __2__, chasing its bouncing __3__.',
                choices: {
                  items: [
                    { id: '1', text: 'chihuahua' },
                    { id: '2', text: 'backyard' },
                    { id: '3', text: 'ball' },
                    { id: '4', text: 'spring' },
                  ],
                  shuffle: true,
                },
              },
              points: {
                min: 1,
              },
            },
            'Sint ipsum anim irure ex. Adipisicing ex est do labore ipsum in et quis. Duis proident labore duis id id tempor aute et esse. Fugiat ea ea eiusmod. Enim Lorem eiusmod culpa ullamco elit anim in magna. Elit laboris pariatur tempor enim voluptate. Et fugiat et anim aliquip fugiat voluptate sunt.\n\nIncididunt commodo excepteur excepteur adipisicing Lorem laboris irure veniam deserunt elit culpa mollit eu. Pariatur mollit non ea non culpa ex Lorem proident officia id incididunt commodo. Nisi sit proident consectetur commodo commodo nostrud excepteur culpa ut mollit cillum. Nulla est in ipsum ullamco mollit. Laboris cupidatat non cillum exercitation Lorem do id sit nulla nisi.',
            {
              id: nanoid(),
              url: 'https://moons.brantem.com/callisto/bundle.js',
              height: 512,
              data: {
                initial: {
                  file: 'planets/neptune/outputs/callisto-1.json',
                },
                output: {
                  file: 'planets/neptune/outputs/callisto-2.json',
                },
                text: 'The __1__ dog quickly dashed across the __2__, chasing its bouncing __3__. Its owner, laughing, picked up their pace to keep an eye on the lively pet.',
                choices: {
                  items: [
                    { id: '1', text: 'chihuahua' },
                    { id: '2', text: 'backyard' },
                    { id: '3', text: 'ball' },
                    { id: '4', text: 'spring' },
                    { id: '5', text: 'walk' },
                  ],
                  shuffle: true,
                },
              },
              points: {
                min: 1,
              },
            },
            'Eu amet eu ut ullamco est proident officia consectetur ad incididunt irure. Et aute tempor et amet veniam incididunt veniam pariatur et anim velit nulla cupidatat eiusmod nostrud. Minim labore et officia cupidatat esse ullamco qui sunt voluptate cupidatat anim commodo mollit nostrud. Cupidatat et excepteur qui duis magna nostrud proident duis in ut. Incididunt pariatur sit cupidatat aute laboris aliquip ullamco deserunt tempor Lorem mollit. Nulla cupidatat nisi ea proident ex enim aliqua in tempor. Duis anim non in velit ut non.\n\nConsectetur in excepteur esse. Culpa nostrud qui sit ea ex in officia labore minim consectetur incididunt. Qui laboris veniam commodo dolore et voluptate id dolor amet eiusmod eiusmod eiusmod. Consequat culpa sunt occaecat pariatur et commodo mollit voluptate aute excepteur laborum. Culpa cillum eu est amet amet est. Non exercitation velit commodo aliquip excepteur sint pariatur mollit do proident in aliquip. Lorem exercitation irure laborum occaecat id non reprehenderit magna nulla adipisicing. Ad ipsum ipsum non est do cupidatat laborum nostrud.',
          ],
        } satisfies Neptune,
        null,
        2,
      ),
    },
  ],
  save(key, body) {
    const file = { key: ROOT + key.trim().replace(new RegExp(`^${ROOT.replace('/', '/')}`), ''), body };
    const index = files.value.findIndex((file) => file.key === key);
    if (index === -1) {
      files.value.push(file);
    } else {
      files.value[index].body = body;
    }
    return file;
  },
  delete(key) {
    files.value = files.value.filter((file) => file.key !== key);
  },

  ...((value) => {
    if (!value) return {};
    const files: File[] = JSON.parse(value) || [];
    if (!files.length) return {};
    return { value: files };
  })(localStorage.getItem('files')),
});

subscribe(files, () => localStorage.setItem('files', JSON.stringify(files.value)));

export const useFiles = () => {
  return [useSnapshot(files), files] as const;
};
