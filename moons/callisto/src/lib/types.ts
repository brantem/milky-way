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

export type Choice = {
  id: string;
  text: string;
};

export type Answer = {
  blankId: string;
  choiceId: string;
};
