import { nanoid, customAlphabet } from 'nanoid';
import { lowercase, uppercase } from 'nanoid-dictionary';

import type { File, SolarSystem, Jupiter, Neptune } from '../types';
import { SOLAR_SYSTEM_FILE } from '../constants';

// this ensures that the id will always start with a letter since it will be
// used as an HTML id
const prefix = customAlphabet(lowercase + uppercase, 1);
const generateId = () => prefix() + nanoid();

const numbers = [
  {
    key: 'milky-way/numbers/tests.json',
    body: JSON.stringify([
      {
        text: 'Draw the number 0 with [](color://#06b6d4)',
        data: {
          label: 0,
          color: '#06b6d4',
        },
      },
      {
        text: 'Draw the number 3',
        data: {
          label: 3,
        },
      },
      {
        text: 'Draw the number 5',
        data: {
          label: 5,
        },
      },
    ]),
  },
  {
    key: 'milky-way/numbers/content.md',
    body: "# The Building Blocks of Counting: Exploring Numbers 0-9\n\n![numbers](https://moons.brantem.com/phobos/numbers.webp)\n\nNumbers are the fundamental tools we use to quantify and understand the world around us. From counting the stars in the sky to measuring ingredients for a recipe, numbers play a vital role in our daily lives. But where do these fascinating symbols come from, and what stories do they hold? Let's delve into the world of numbers, starting with the foundational building blocks: 0 through 9.\n\n## 0: The Beginning of Everything\n\nOften overlooked, 0, the number zero, occupies a unique position as the starting point for all counting. It represents nothingness, emptiness, and the absence of quantity. Yet, paradoxically, it holds immense power. It allows us to express large numbers and perform complex calculations. Without zero, our understanding of mathematics and science would be drastically different.\n\n## 1: The Seed of All Numbers\n\nThe number 1 signifies unity, oneness, and the beginning of something new. It is the seed from which all other numbers grow, representing the first step, the initial element. Without 1, we wouldn't have the concept of counting or the ability to quantify individual things.\n\n## 2: Balance and Duality\n\nTwo signifies duality, balance, and the concept of opposites. It represents two sides of a coin, two paths to choose from, or two perspectives to consider. The number 2 underpins many fundamental principles, such as symmetry, comparison, and choice.\n\n## 3: Triangles and the Power of Three\n\nThree represents a stable triangle, the simplest and strongest polygonal shape. It symbolizes growth, progress, and the manifestation of potential. From the three primary colors to the three stages of life, the number 3 holds a significant place in various cultures and belief systems.\n\n## 4: The Cardinal Directions\n\nFour signifies the four cardinal directions – north, south, east, and west. It represents stability, grounding, and a sense of direction. The number 4 is associated with the four seasons, the four elements (earth, air, fire, water), and the four stages of the moon.\n\n## 5: Harmony and the Golden Ratio\n\nFive represents the human body with its five senses and five fingers on each hand. It also signifies harmony, balance, and the Golden Ratio, a mathematical constant found throughout nature and art. The pentagon, a five-sided shape, represents strength, protection, and stability.\n\n## 6: Hexagons and the Natural World\n\nSix represents the hexagonal shape found in honeycombs, snowflakes, and the structure of carbon atoms. It signifies unity, cooperation, and the interconnectedness of life. The number 6 is also associated with the six directions in space – up, down, forward, backward, left, and right.\n\n## 7: Luck and Mystery\n\nSeven holds a special place in many cultures, associated with luck, mystery, and the unknown. It is associated with the seven days of the week, the seven colors of the rainbow, and the seven musical notes. The number 7 often symbolizes spiritual enlightenment and completion.\n\n## 8: Infinity and the Cycle of Life\n\nEight signifies infinity, the symbol of endlessness and the cyclical nature of life. It is associated with the eight phases of the moon, the eight limbs of yoga, and the eight directions of the compass rose. The number 8 represents balance, abundance, and the potential for new beginnings.\n\n## 9: Completion and Transformation\n\nNine represents completion, transformation, and the end of a cycle. It is the last single-digit number and symbolizes the culmination of effort, the attainment of wisdom, and the release of old patterns. The number 9 is often associated with humanitarianism, compassion, and service to others.\n\nThese are just a few glimpses into the fascinating world of numbers 0 through 9. Each number holds its own unique significance and story, waiting to be explored. As we continue our journey through the world of mathematics, we discover that these seemingly simple symbols are gateways to understanding the universe and our place within it.",
  },
  {
    key: 'milky-way/numbers/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Numbers',
      layout: 'jupiter',
      small: {
        id: generateId(),
        url: 'https://moons.brantem.com/deimos/bundle.js',
        data: {
          tasks: {
            file: 'milky-way/numbers/tests.json',
            output: 'milky-way/numbers/outputs/deimos.json',
          },
        },
      },
      medium: {
        id: generateId(),
        url: 'https://moons.brantem.com/phobos/bundle.js',
        data: {
          content: {
            file: 'milky-way/numbers/content.md',
          },
        },
      },
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/ganymede/bundle.js',
        data: {
          initial: {
            file: 'milky-way/numbers/outputs/ganymede.json',
          },
          tests: {
            file: 'milky-way/numbers/tests.json',
          },
          output: {
            file: 'milky-way/numbers/outputs/ganymede.json',
            deimos: 'milky-way/numbers/outputs/deimos.json',
          },
          model: {
            type: 'onnx',
            urls: {
              wasmPath: 'https://moons.brantem.com/ganymede/',
              modelUrl: 'https://moons.brantem.com/ganymede/mnist/mnist-12.onnx',
            },
            input: {
              width: 28,
              height: 28,
            },
            probability: {
              min: 90,
              max: 100,
            },
          },
        },
        points: {
          min: 3,
        },
      },
    } satisfies Jupiter),
  },
];

const shapes = [
  {
    key: 'milky-way/shapes/tests.json',
    body: JSON.stringify([
      {
        text: 'Draw a square with any color',
        data: {
          label: 'square',
        },
      },
      {
        text: 'Draw a triangle with [](color://#f59e0b)',
        data: {
          label: 'triangle',
          color: '#f59e0b',
        },
      },
    ]),
  },
  {
    key: 'milky-way/shapes/content.md',
    body: "# Square and Triangle: Two Fundamental Shapes\n\nThe square and triangle are two of the most basic and fundamental shapes in geometry. They are the building blocks of many other shapes and are found all around us in nature and in human-made objects.\n\n## The Square\n\n![square](https://moons.brantem.com/phobos/square.webp)\n\nA square is a quadrilateral with four equal sides and four right angles. Its sides are all congruent and its diagonals are perpendicular bisectors of each other. Squares are highly symmetrical and have rotational symmetry of order 4.\n\n### Properties of a Square:\n\n- Four equal sides\n- Four right angles\n- Two pairs of parallel sides\n- Two diagonals that bisect each other at a right angle\n- Rotational symmetry of order 4\n\n### Squares are found in many places in our everyday lives, such as:\n\n- Tiles on a floor or wall\n- Windows\n- Dice\n- Rubik's cubes\n- Computer screens\n- Paintings and other artwork\n\n## The Triangle\n\n![triangle](https://moons.brantem.com/phobos/triangle.webp)\n\nA triangle is a polygon with three sides and three angles. There are many different types of triangles, each with its own unique properties. The three most common types of triangles are:\n\n- Equilateral triangle: All three sides are equal and all three angles are equal (60 degrees each).\n- Isosceles triangle: Two sides are equal and the two base angles are equal.\n- Scalene triangle: No sides or angles are equal.\n\n### Properties of a Triangle:\n\n- Three sides\n- Three angles\n- The sum of the three angles is equal to 180 degrees\n- Triangles can be classified by their side lengths (equilateral, isosceles, scalene) or by their angles (acute, right, obtuse)\n\n### Triangles are also found in many places in our everyday lives, such as:\n\n- Rooftops\n- Mountains\n- Traffic signs\n- Pizza slices\n- Slices of pie\n- The shape of many plants and leaves",
  },
  {
    key: 'milky-way/shapes/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Shapes',
      layout: 'jupiter',
      small: {
        id: generateId(),
        url: 'https://moons.brantem.com/deimos/bundle.js',
        data: {
          tasks: {
            file: 'milky-way/shapes/tests.json',
            output: 'milky-way/shapes/outputs/deimos.json',
          },
        },
      },
      medium: {
        id: generateId(),
        url: 'https://moons.brantem.com/phobos/bundle.js',
        data: {
          content: {
            file: 'milky-way/shapes/content.md',
          },
        },
      },
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/ganymede/bundle.js',
        data: {
          initial: {
            file: 'milky-way/shapes/outputs/ganymede.json',
          },
          tests: {
            file: 'milky-way/shapes/tests.json',
          },
          output: {
            file: 'milky-way/shapes/outputs/ganymede.json',
            deimos: 'milky-way/shapes/outputs/deimos.json',
          },
          model: {
            type: 'teachable_machine',
            urls: {
              baseUrl: 'https://moons.brantem.com/ganymede/shapes',
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
        points: {
          min: 3,
        },
      },
    } satisfies Jupiter),
  },
];

const ioData = {
  left: {
    items: [
      { id: '1', text: 'Square' },
      { id: '2', text: 'Japan' },
      { id: '3', text: 'Mars' },
      { id: '4', text: 'Leonardo da Vinci' },
    ],
    shuffle: true,
  },
  right: {
    items: [
      { id: '1', text: 'Four equal sides' },
      { id: '2', text: 'Tokyo' },
      { id: '3', text: 'Phobos' },
      { id: '4', text: 'Mona Lisa' },
    ],
    shuffle: true,
  },
};

const match = [
  {
    key: 'milky-way/match/tests.json',
    body: JSON.stringify([
      {
        text: 'Match all pairs',
        data: {
          value: 4,
        },
      },
    ]),
  },
  {
    key: 'milky-way/match/content.md',
    body: '# Commodo ipsum ipsum incididunt eu.\n\nDolor occaecat et enim velit ea commodo. Est excepteur elit exercitation dolore veniam officia fugiat ut quis qui. Velit ipsum id nostrud aliqua amet ea aliquip ex veniam excepteur mollit ad irure sint. Dolore excepteur anim aliquip consectetur sit esse amet ea est velit occaecat aliqua et est. Deserunt Lorem aute sint eu tempor ut sit cupidatat eiusmod amet ex reprehenderit ut aute. Occaecat ullamco tempor enim et velit ea fugiat nulla. Magna proident tempor culpa dolore sint occaecat anim occaecat ut exercitation mollit anim nulla.\n\nConsequat pariatur anim occaecat laborum laborum tempor sit elit consectetur enim duis. Reprehenderit exercitation adipisicing exercitation aliquip nisi incididunt fugiat enim laboris eu anim do culpa nisi. Aute nisi sint tempor non minim occaecat tempor amet. Nostrud laboris aute proident tempor proident adipisicing occaecat id esse nulla do. Incididunt eu ad dolor officia culpa proident enim est ipsum commodo deserunt elit sunt exercitation Lorem.\n\nEt dolore commodo commodo commodo minim laboris ullamco laborum labore deserunt magna. Officia quis officia veniam sit nulla. Laborum do adipisicing do est nulla fugiat qui et pariatur consequat mollit ex. Magna consectetur eiusmod ipsum exercitation voluptate sint labore pariatur laborum adipisicing magna nisi cillum.',
  },
  {
    key: 'milky-way/match/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Match',
      layout: 'jupiter',
      small: {
        id: generateId(),
        url: 'https://moons.brantem.com/deimos/bundle.js',
        data: {
          tasks: {
            file: 'milky-way/match/tests.json',
            output: 'milky-way/match/outputs/deimos.json',
          },
        },
      },
      medium: {
        id: generateId(),
        url: 'https://moons.brantem.com/phobos/bundle.js',
        data: {
          content: {
            file: 'milky-way/match/content.md',
          },
        },
      },
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/io/bundle.js',
        data: {
          initial: {
            file: 'milky-way/match/outputs/io.json',
          },
          output: {
            file: 'milky-way/match/outputs/io.json',
            deimos: 'milky-way/match/outputs/deimos.json',
          },
          ...ioData,
        },
        points: {
          min: 4,
        },
      },
    } satisfies Jupiter),
  },
];

const matchWithoutDeimos = [
  {
    key: 'milky-way/match/without-deimos/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Match',
      layout: 'jupiter',
      medium: {
        id: generateId(),
        url: 'https://moons.brantem.com/phobos/bundle.js',
        data: {
          content: {
            file: 'milky-way/match/content.md',
          },
        },
      },
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/io/bundle.js',
        data: {
          initial: {
            file: 'milky-way/match/outputs/io.json',
          },
          output: {
            file: 'milky-way/match/without-deimos/outputs/io.json',
          },
          ...ioData,
        },
        points: {
          min: 4,
        },
      },
    } satisfies Jupiter),
  },
];

const matchWithoutDeimosAndPhobos = [
  {
    key: 'milky-way/match/without-deimos-and-phobos/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Match',
      layout: 'jupiter',
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/io/bundle.js',
        data: {
          initial: {
            file: 'milky-way/match/without-deimos/outputs/io.json',
          },
          output: {
            file: 'milky-way/match/without-deimos-and-phobos/outputs/io.json',
          },
          ...ioData,
        },
        points: {
          min: 4,
        },
      },
    } satisfies Jupiter),
  },
];

const matchWithoutDeimosPhobosAndActions = [
  {
    key: 'milky-way/match/without-deimos-phobos-and-actions/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Match',
      layout: 'jupiter',
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/io/bundle.js',
        data: {
          initial: {
            file: 'milky-way/match/without-deimos-and-phobos/outputs/io.json',
          },
          output: {
            file: 'milky-way/match/without-deimos-phobos-and-actions/outputs/io.json',
          },
          ...ioData,
        },
        points: {
          min: 4,
        },
        actions: {
          active: false,
        },
      },
    } satisfies Jupiter),
  },
];

const phobos = [
  {
    key: 'milky-way/phobos/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Phobos',
      layout: 'jupiter',
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/phobos/bundle.js',
        data: {
          content: {
            file: 'milky-way/numbers/content.md',
          },
        },
        actions: {
          active: false,
        },
      },
    } satisfies Jupiter),
  },
];

const media = [
  {
    key: 'milky-way/media/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Media',
      layout: 'jupiter',
      small: {
        id: generateId(),
        url: 'https://moons.brantem.com/media/bundle.js',
        data: {
          type: 'image',
          url: 'https://moons.brantem.com/media/image-2.webp',
        },
      },
      medium: {
        id: generateId(),
        url: 'https://moons.brantem.com/media/bundle.js',
        data: {
          type: 'image',
          url: 'https://moons.brantem.com/phobos/numbers.webp',
        },
      },
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/media/bundle.js',
        data: {
          type: 'image',
          url: 'https://moons.brantem.com/media/image-1.webp',
        },
        actions: {
          active: false,
        },
      },
    } satisfies Jupiter),
  },
];

const confetti = [
  {
    key: 'milky-way/confetti/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Confetti',
      layout: 'jupiter',
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/confetti/bundle.js',
        data: {},
        actions: {
          active: false,
        },
      },
    } satisfies Jupiter),
  },
];

const ioCallistoGanymede = [
  {
    key: 'milky-way/io-callisto-ganymede/tests.json',
    body: JSON.stringify([
      {
        text: 'Draw a square with any color',
        data: {
          label: 'square',
        },
      },
    ]),
  },
  {
    key: 'milky-way/io-callisto-ganymede/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Vertical',
      layout: 'jupiter',
      small: {
        id: generateId(),
        url: 'https://moons.brantem.com/ganymede/bundle.js',
        data: {
          initial: {
            file: 'milky-way/io-callisto-ganymede/outputs/ganymede.json',
          },
          tests: {
            file: 'milky-way/io-callisto-ganymede/tests.json',
          },
          output: {
            file: 'milky-way/io-callisto-ganymede/outputs/ganymede.json',
          },
          model: {
            type: 'teachable_machine',
            urls: {
              baseUrl: 'https://moons.brantem.com/ganymede/shapes',
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
        points: {
          min: 1,
        },
      },
      medium: {
        id: generateId(),
        url: 'https://moons.brantem.com/callisto/bundle.js',
        data: {
          initial: {
            file: 'milky-way/io-callisto-ganymede/outputs/callisto.json',
          },
          output: {
            file: 'milky-way/io-callisto-ganymede/outputs/callisto.json',
          },
          text: 'The __1__ dog quickly dashed across the __2__, chasing its bouncing __3__.',
          choices: {
            items: [
              { id: '1', text: 'chihuahua' },
              { id: '2', text: 'backyard' },
              { id: '3', text: 'ball' },
              { id: '4', text: 'airplane' },
            ],
            shuffle: true,
          },
        },
        points: {
          min: 3,
        },
      },
      large: {
        id: generateId(),
        url: 'https://moons.brantem.com/io/bundle.js',
        data: {
          initial: {
            file: 'milky-way/io-callisto-ganymede/outputs/io.json',
          },
          output: {
            file: 'milky-way/io-callisto-ganymede/outputs/io.json',
          },
          ...ioData,
        },
        points: {
          min: 4,
        },
        actions: {
          active: false,
        },
      },
    } satisfies Jupiter),
  },
];

const vertical = [
  {
    key: 'milky-way/vertical/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Vertical',
      layout: 'neptune',
      moons: [
        {
          id: generateId(),
          url: 'https://moons.brantem.com/phobos/bundle.js',
          data: {
            content: {
              file: 'milky-way/vertical/section-1.md',
            },
          },
        },
        {
          id: generateId(),
          url: 'https://moons.brantem.com/callisto/bundle.js',
          height: 512,
          data: {
            initial: {
              file: 'milky-way/vertical/outputs/callisto-1.json',
            },
            output: {
              file: 'milky-way/vertical/outputs/callisto-1.json',
            },
            text: 'Cooking is a fun __1__ that lets you be creative in the kitchen. Using different __2__ like pots, pans, and utensils, you can whip up delicious __3__ for yourself and others.',
            choices: {
              items: [
                { id: '1', text: 'activity' },
                { id: '2', text: 'tools' },
                { id: '3', text: 'dishes' },
                { id: '4', text: 'airplane' },
              ],
              shuffle: true,
            },
          },
          points: {
            min: 3,
          },
        },
        {
          id: generateId(),
          url: 'https://moons.brantem.com/phobos/bundle.js',
          data: {
            content: {
              file: 'milky-way/vertical/section-2.md',
            },
          },
        },
        {
          id: generateId(),
          url: 'https://moons.brantem.com/callisto/bundle.js',
          height: 512,
          data: {
            initial: {
              file: 'milky-way/vertical/outputs/callisto-1.json',
            },
            output: {
              file: 'milky-way/vertical/outputs/callisto-2.json',
            },
            text: "Cooking is a fun __1__ that lets you be creative in the kitchen. Using different __2__ like pots, pans, and utensils, you can whip up delicious __3__ for yourself and others. However, it's crucial not to let technology __4__ the joy of making meals. We should aim to embrace traditional cooking methods and not __5__ the pleasure of preparing food by hand.",
            choices: {
              items: [
                { id: '1', text: 'activity' },
                { id: '2', text: 'tools' },
                { id: '3', text: 'dishes' },
                { id: '4', text: 'replace' },
                { id: '5', text: 'lose' },
                { id: '6', text: 'ignore' },
              ],
              shuffle: true,
            },
          },
          points: {
            min: 5,
          },
        },
        {
          id: generateId(),
          url: 'https://moons.brantem.com/phobos/bundle.js',
          data: {
            content: {
              file: 'milky-way/vertical/section-3.md',
            },
          },
        },
      ],
    } satisfies Neptune),
  },
  {
    key: 'milky-way/vertical/section-1.md',
    body: '# Est duis culpa deserunt commodo exercitation.\n\nDolor adipisicing excepteur amet deserunt deserunt labore in tempor sint dolore anim ad consectetur id quis. Aliquip consequat cillum adipisicing ipsum eiusmod excepteur anim ullamco adipisicing esse consequat. Deserunt duis est proident aute in sunt. Laborum pariatur laboris mollit anim minim minim ullamco in ipsum sunt exercitation. Veniam ipsum cupidatat exercitation dolore cillum ex tempor nulla irure. Enim ad nostrud labore ad sint Lorem excepteur et. Do commodo est amet amet ex nulla ipsum. Minim esse sint enim ipsum ut magna mollit deserunt enim elit laborum occaecat exercitation.\n\nCillum nulla proident ipsum aliquip dolor anim sunt amet amet velit fugiat. Sint proident elit laborum exercitation eiusmod ullamco culpa excepteur eiusmod culpa. Officia sit nisi nostrud excepteur aliquip do. Cillum dolor dolore quis quis magna magna sint excepteur adipisicing non aliqua ad cillum. Deserunt sunt id sit ad mollit officia veniam reprehenderit voluptate consequat amet adipisicing sint quis. Consectetur excepteur id consequat ut sint voluptate cillum. Fugiat adipisicing minim et et magna. Proident quis ea dolor minim ipsum eiusmod enim labore est veniam minim in eiusmod mollit exercitation.\n\nCulpa eu officia esse culpa esse. Adipisicing laborum pariatur qui. Magna do deserunt Lorem deserunt excepteur. Deserunt qui nulla excepteur sint consequat excepteur reprehenderit.',
  },
  {
    key: 'milky-way/vertical/section-2.md',
    body: 'Sint ipsum anim irure ex. Adipisicing ex est do labore ipsum in et quis. Duis proident labore duis id id tempor aute et esse. Fugiat ea ea eiusmod. Enim Lorem eiusmod culpa ullamco elit anim in magna. Elit laboris pariatur tempor enim voluptate. Et fugiat et anim aliquip fugiat voluptate sunt.\n\nIncididunt commodo excepteur excepteur adipisicing Lorem laboris irure veniam deserunt elit culpa mollit eu. Pariatur mollit non ea non culpa ex Lorem proident officia id incididunt commodo. Nisi sit proident consectetur commodo commodo nostrud excepteur culpa ut mollit cillum. Nulla est in ipsum ullamco mollit. Laboris cupidatat non cillum exercitation Lorem do id sit nulla nisi.',
  },
  {
    key: 'milky-way/vertical/section-3.md',
    body: 'Eu amet eu ut ullamco est proident officia consectetur ad incididunt irure. Et aute tempor et amet veniam incididunt veniam pariatur et anim velit nulla cupidatat eiusmod nostrud. Minim labore et officia cupidatat esse ullamco qui sunt voluptate cupidatat anim commodo mollit nostrud. Cupidatat et excepteur qui duis magna nostrud proident duis in ut. Incididunt pariatur sit cupidatat aute laboris aliquip ullamco deserunt tempor Lorem mollit. Nulla cupidatat nisi ea proident ex enim aliqua in tempor. Duis anim non in velit ut non.\n\nConsectetur in excepteur esse. Culpa nostrud qui sit ea ex in officia labore minim consectetur incididunt. Qui laboris veniam commodo dolore et voluptate id dolor amet eiusmod eiusmod eiusmod. Consequat culpa sunt occaecat pariatur et commodo mollit voluptate aute excepteur laborum. Culpa cillum eu est amet amet est. Non exercitation velit commodo aliquip excepteur sint pariatur mollit do proident in aliquip. Lorem exercitation irure laborum occaecat id non reprehenderit magna nulla adipisicing. Ad ipsum ipsum non est do cupidatat laborum nostrud.',
  },
];

const verticalAll = [
  {
    key: 'milky-way/vertical-all/_planet.json',
    body: JSON.stringify({
      id: generateId(),
      title: 'Vertical',
      layout: 'neptune',
      moons: [
        {
          id: generateId(),
          url: 'https://moons.brantem.com/callisto/bundle.js',
          height: 512,
          data: {
            initial: {
              file: 'milky-way/vertical-all/outputs/callisto.json',
            },
            output: {
              file: 'milky-way/vertical-all/outputs/callisto.json',
            },
            text: 'Cooking is a fun __1__ that lets you be creative in the kitchen. Using different __2__ like pots, pans, and utensils, you can whip up delicious __3__ for yourself and others.',
            choices: {
              items: [
                {
                  id: '1',
                  text: 'activity',
                },
                {
                  id: '2',
                  text: 'tools',
                },
                {
                  id: '3',
                  text: 'dishes',
                },
                {
                  id: '4',
                  text: 'airplane',
                },
              ],
              shuffle: true,
            },
          },
        },
        {
          id: generateId(),
          url: 'https://moons.brantem.com/ganymede/bundle.js',
          height: 512,
          data: {
            initial: {
              file: 'milky-way/vertical-all/outputs/ganymede.json',
            },
            output: {
              file: 'milky-way/vertical-all/outputs/ganymede.json',
            },
          },
        },
        {
          id: generateId(),
          url: 'https://moons.brantem.com/io/bundle.js',
          height: 512,
          data: {
            initial: {
              file: 'milky-way/vertical-all/outputs/io.json',
            },
            output: {
              file: 'milky-way/vertical-all/outputs/io.json',
            },
            left: {
              items: [
                {
                  id: '1',
                  text: 'Square',
                },
                {
                  id: '2',
                  text: 'Japan',
                },
                {
                  id: '3',
                  text: 'Mars',
                },
                {
                  id: '4',
                  text: 'Leonardo da Vinci',
                },
                {
                  id: '5',
                  text: 'Broccoli',
                },
              ],
              shuffle: true,
            },
            right: {
              items: [
                {
                  id: '1',
                  text: 'Four equal sides',
                },
                {
                  id: '2',
                  text: 'Tokyo',
                },
                {
                  id: '3',
                  text: 'Phobos',
                },
                {
                  id: '4',
                  text: 'Mona Lisa',
                },
                {
                  id: '5',
                  text: 'Vegetable',
                },
              ],
              shuffle: true,
            },
          },
        },
        {
          id: generateId(),
          url: 'https://moons.brantem.com/confetti/bundle.js',
          height: 512,
          data: {},
        },
        {
          id: generateId(),
          url: 'https://moons.brantem.com/media/bundle.js',
          height: 512,
          data: {
            type: 'image',
            url: 'https://moons.brantem.com/media/image-2.webp',
          },
        },
      ],
    } satisfies Neptune),
  },
];

export default [
  {
    key: `milky-way/${SOLAR_SYSTEM_FILE}`,
    body: JSON.stringify({
      id: 'milky-way',
      title: 'Milky Way',
      planets: [
        {
          id: 'numbers',
          file: 'milky-way/numbers/_planet.json',
        },
        {
          id: 'shapes',
          file: 'milky-way/shapes/_planet.json',
        },
        {
          id: 'match',
          file: 'milky-way/match/_planet.json',
        },
        {
          id: 'match-without-deimos',
          file: 'milky-way/match/without-deimos/_planet.json',
        },
        {
          id: 'match-without-deimos-and-phobos',
          file: 'milky-way/match/without-deimos-and-phobos/_planet.json',
        },
        {
          id: 'match-without-deimos-phobos-and-actions',
          file: 'milky-way/match/without-deimos-phobos-and-actions/_planet.json',
        },
        {
          id: 'phobos',
          file: 'milky-way/phobos/_planet.json',
        },
        {
          id: 'media',
          file: 'milky-way/media/_planet.json',
        },
        {
          id: 'confetti',
          file: 'milky-way/confetti/_planet.json',
        },
        {
          id: 'io-callisto-ganymede',
          file: 'milky-way/io-callisto-ganymede/_planet.json',
        },
        {
          id: 'vertical',
          file: 'milky-way/vertical/_planet.json',
        },
        {
          id: 'vertical-all',
          file: 'milky-way/vertical-all/_planet.json',
        },
      ],
    } satisfies SolarSystem),
  },
  ...numbers,
  ...shapes,
  ...match,
  ...matchWithoutDeimos,
  ...matchWithoutDeimosAndPhobos,
  ...matchWithoutDeimosPhobosAndActions,
  ...phobos,
  ...media,
  ...confetti,
  ...ioCallistoGanymede,
  ...vertical,
  ...verticalAll,
  {
    key: 'milky-way/_cache.json',
    body: JSON.stringify([
      'https://moons.brantem.com/callisto/bundle.js',
      'https://moons.brantem.com/confetti/bundle.js',
      'https://moons.brantem.com/deimos/bundle.js',
      'https://moons.brantem.com/europa/bundle.js',
      'https://moons.brantem.com/ganymede/bundle.js',
      'https://moons.brantem.com/ganymede/mnist/mnist-12.onnx',
      'https://moons.brantem.com/ganymede/ort-wasm-simd-threaded.wasm',
      'https://moons.brantem.com/ganymede/ort-wasm-simd.wasm',
      'https://moons.brantem.com/ganymede/ort-wasm-threaded.wasm',
      'https://moons.brantem.com/ganymede/ort-wasm.wasm',
      'https://moons.brantem.com/ganymede/shapes/metadata.json',
      'https://moons.brantem.com/ganymede/shapes/model.json',
      'https://moons.brantem.com/ganymede/shapes/weights.bin',
      'https://moons.brantem.com/io/bundle.js',
      'https://moons.brantem.com/media/bundle.js',
      'https://moons.brantem.com/media/image-1.webp',
      'https://moons.brantem.com/media/image-2.webp',
      'https://moons.brantem.com/phobos/bundle.js',
      'https://moons.brantem.com/phobos/numbers.webp',
      'https://moons.brantem.com/phobos/square.webp',
      'https://moons.brantem.com/phobos/triangle.webp',
    ]),
  },
] as File[];
