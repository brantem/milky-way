export enum Action {
  Refresh = 'refresh',
  SetColor = 'color:set',
}

export enum Resource {
  Files = 'files',
}

export type File = {
  key: string;
  body: string;
};
