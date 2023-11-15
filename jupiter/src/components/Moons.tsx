import Moon from './Moon';

const Moons = () => {
  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <Moon
        name="Ganymede"
        url="https://moons.brantem.com/ganymede/bundle.js"
        width={1024}
        height={768}
        data={{
          // model: {
          //   type: 'onnx',
          //   urls: {
          //     modelUrl: 'https://raw.githubusercontent.com/brantem/adudu/master/mnist/mnist-12.onnx',
          //   },
          //   input: {
          //     width: 28,
          //     height: 28,
          //   },
          // },
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
        }}
        onChange={(data, points) => console.log(data, points)}
      />

      <Moon
        name="Callisto"
        url="https://moons.brantem.com/callisto/bundle.js"
        width={1024}
        height={768}
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

      <Moon
        name="Io"
        url="https://moons.brantem.com/io/bundle.js"
        width={1024}
        height={768}
        data={{
          left: [
            { id: '1', text: 'Square' },
            { id: '2', text: 'Japan' },
            { id: '3', text: 'Mars' },
            { id: '4', text: 'Leonardo da Vinci' },
            { id: '5', text: 'Broccoli' },
          ],
          right: [
            { id: '1', text: 'Four equal sides' },
            { id: '2', text: 'Tokyo' },
            { id: '3', text: 'Phobos' },
            { id: '4', text: 'Mona Lisa' },
            { id: '5', text: 'Vegetable' },
          ],
        }}
        onChange={(data, points) => console.log(data, points)}
      />
    </div>
  );
};

export default Moons;
