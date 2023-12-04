export enum Resource {
  Files = 'files',
}

export type File = {
  key: string;
  body: string;
};

export type Moon = {
  id: string;
  url: string;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  data: Record<string, unknown>;
  debug?: boolean;
};

export type Planet = {
  id: string;
  title: string;
  layout: 'jupiter' | 'neptune';
};

export type SolarSystem = {
  title: string;
  planets: { id: string; file: string }[];
};

export type Jupiter = Planet & {
  layout: 'jupiter';
  small: Moon & { active: boolean };
  medium: Moon & { active: boolean };
  large: Moon & {
    actions: {
      active: boolean;
      reset: boolean;
      submit: boolean;
    };
  };
};

export type Neptune = Planet & {
  layout: 'neptune';
  moons: (string | (Moon & { points: { min: number } }))[];
};

export type Parent = {
  id: string;
  request(resource: Resource.Files, keys: string[]): (File | undefined)[];
};
