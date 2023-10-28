import Moon from './Moon';

const Moons = () => {
  return (
    <div className="p-3 rounded-lg border flex flex-col items-start space-y-2">
      <h1 className="font-semibold text-xl mb-2">Moons</h1>

      <Moon name="Ganymede" url="http://localhost:7001/bundle.js" />
      <Moon name="Callisto" url="http://localhost:7002/bundle.js" />
    </div>
  );
};

export default Moons;
