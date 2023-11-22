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
