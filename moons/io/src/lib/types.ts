export enum Action {
  Reset = 'reset',
}

export enum Resource {
  Files = 'files',
}

export type File = {
  key: string;
  body: string;
};

export type Item = {
  id: string;
  text: string;
};

export enum Side {
  Left = 'left',
  Right = 'right',
}

export type Coordinate = {
  x: number;
  y: number;
};

export type Line = {
  a: string;
  b: string;
};
