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
  points?: {
    min?: number;
    max?: number;
  };
};

export type SolarSystem = {
  id: string;
  title: string;
  planets: { id: string; file: string }[];
};

export type Jupiter = {
  id: string;
  title: string;
  layout: 'jupiter';
  small?: Moon & { active?: boolean };
  medium?: Moon & { active?: boolean };
  large: Moon & {
    actions: {
      active: boolean;
      reset: boolean;
      submit: boolean;
    };
  };
};

export type Neptune = {
  id: string;
  title: string;
  layout: 'neptune';
  moons: Moon[];
};

export type Planet = Jupiter | Neptune;

export type Parent = {
  id: string;
  request(resource: Resource.Files, keys: string[]): Promise<(File | null)[]>;
};
