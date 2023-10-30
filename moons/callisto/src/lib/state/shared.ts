import { proxy } from 'valtio';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

type Answer = {
  blankId: string;
  choice: string;
};

export type AppState = {
  choices: string[];
  answers: Answer[];

  fillBlank(blankId: string, choice: string): void;
  putBackChoice(choice: string): void;
};

export const state = proxy<AppState>({
  choices: [],
  answers: [],

  fillBlank(blankId, choice) {
    let origin, target;
    for (let i = 0; i < state.answers.length; i++) {
      if (state.answers[i].blankId === blankId) target = i;
      if (state.answers[i].choice === choice) origin = i;
    }
    if (origin !== undefined && target !== undefined) {
      const temp = state.answers[origin].blankId;
      state.answers[origin].blankId = state.answers[target].blankId;
      state.answers[target].blankId = temp;
    } else if (origin === undefined && target !== undefined) {
      state.choices = state.choices.filter((v) => v !== choice);
      state.choices.push(state.answers[target].choice);
      state.answers[target].choice = choice;
    } else {
      state.choices = state.choices.filter((v) => v !== choice);
      state.answers = state.answers.filter((answer) => answer.blankId !== blankId && answer.choice !== choice);
      state.answers.push({ blankId, choice });
    }
  },
  putBackChoice(choice) {
    state.choices.push(choice);
    state.answers = state.answers.filter((answer) => answer.choice !== choice);
  },
});
