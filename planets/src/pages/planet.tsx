import Navigation from '../components/Navigation';
import Jupiter from '../components/planets/Jupiter';
import Neptune from '../components/planets/Neptune';

import { usePlanet } from '../lib/hooks';

const Planet = () => {
  const planet = usePlanet();

  return (
    <>
      {(() => {
        switch (planet.layout) {
          case 'jupiter':
            return <Jupiter />;
          case 'neptune':
            return <Neptune />;
          default:
            return null;
        }
      })()}
      <Navigation />
    </>
  );
};

export default Planet;
