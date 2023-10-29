export enum Side {
  Left = 'left',
  Right = 'right',
}

export type Dot = {
  side: Side;
  index: number;
};

export type Coordinate = {
  x: number;
  y: number;
};
