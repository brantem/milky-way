import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import Navigation from '../components/Navigation';
import Jupiter from '../components/planets/Jupiter';
import Neptune from '../components/planets/Neptune';

import { usePlanet } from '../lib/hooks';

const Planet = () => {
  const location = useLocation();
  const planet = usePlanet();

  return (
    <Fragment key={location.key}>
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
    </Fragment>
  );
};

export default Planet;
