import { proxy } from 'valtio';
import { Choice, Answer } from '../types';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}

export type AppState = {
  m: Map<string, Choice>;
  choiceIds: string[];
  answers: Answer[];

  fillBlank(blankId: string, choiceId: string): void;
  putBackChoice(choiceId: string): void;
};

export const state = proxy<AppState>({
  m: new Map(),
  choiceIds: [],
  answers: [],

  fillBlank(blankId, choiceId) {
    let origin, target;
    for (let i = 0; i < state.answers.length; i++) {
      if (state.answers[i].blankId === blankId) target = i;
      if (state.answers[i].choiceId === choiceId) origin = i;
    }
    if (origin !== undefined && target !== undefined) {
      const temp = state.answers[origin].blankId;
      state.answers[origin].blankId = state.answers[target].blankId;
      state.answers[target].blankId = temp;
    } else if (origin === undefined && target !== undefined) {
      state.choiceIds = state.choiceIds.filter((id) => id !== choiceId);
      state.choiceIds.push(state.answers[target].choiceId);
      state.answers[target].choiceId = choiceId;
    } else {
      state.choiceIds = state.choiceIds.filter((id) => id !== choiceId);
      state.answers = state.answers.filter((answer) => answer.blankId !== blankId && answer.choiceId !== choiceId);
      state.answers.push({ blankId, choiceId });
    }
  },
  putBackChoice(choiceId) {
    const index = state.answers.findIndex((answer) => answer.choiceId === choiceId);
    if (index === -1) return;
    state.choiceIds.push(choiceId);
    state.answers.splice(index, 1);
  },
});
