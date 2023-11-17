import Layout from './Layout';
import Tasks from './Tasks';
import Content from './Content';
import Moon from './Moon';

const Bla = () => {
  return (
    <Layout
      small={{ component: <Tasks /> }}
      medium={{ component: <Content /> }}
      large={{
        component: (
          <Moon
            url="https://moons.brantem.com/ganymede/bundle.js"
            width="100%"
            height="100%"
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
        ),
        actions: {
          active: true,
          reset: true,
          submit: true,
          next: true,
        },
      }}
    />
  );
};

export default Bla;
