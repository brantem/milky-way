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
  data: Record<string, any>;
  debug?: boolean;
};

export type Planet = {
  id: string;
};

export type Jupiter = Planet & {
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

export type Parent = {
  id: string;
  request(resource: Resource.Files, keys: string[]): (File | undefined)[];
};
