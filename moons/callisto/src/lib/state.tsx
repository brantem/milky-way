import { createContext, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { Action, Resource, type File, type Choice, type Answer } from './types';
import { shuffle } from './helpers';

type State = {
  m: Map<string, Choice>;
  choiceIds: string[];
  answers: Answer[];

  fillBlank(blankId: string, choiceId: string): void;
  putBackChoice(choiceId: string): void;
};

export const CallistoContext = createContext<State>({
  m: new Map(),
  choiceIds: [],
  answers: [],

  fillBlank() {},
  putBackChoice() {},
});

export type ProviderHandle = {
  snapshot(): { files: File[]; points: number };
  execute(action: Action.Reset): boolean;
};

export type ProviderProps = {
  parent: {
    id: string;
    request: (resource: Resource.Files, keys: string[]) => (File | undefined)[];
  };
  id: string;
  data: {
    initial?: {
      file?: string;
    };
    output?: {
      file?: string;
    };
    text: string;
    choices: {
      items: Choice[];
      shuffle?: boolean;
    };
  };
  onChange(files: File[], points: number): void;
  children: React.ReactNode;
};

export const Provider = forwardRef<ProviderHandle, ProviderProps>(({ parent, id, data, children, onChange }, ref) => {
  const m = useMemo(() => {
    let choices = data.choices.items || [];
    if (data.choices.shuffle) choices = shuffle(choices, id);

    const m = new Map<Choice['id'], Choice>();
    choices.forEach((choice) => m.set(choice.id, choice));
    return m;
  }, [id, data.choices]);

  const [choiceIds, setChoiceIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const snapshot: ProviderHandle['snapshot'] = () => {
    const points = answers.reduce((points, answer) => {
      return answer.blankId === `__${answer.choiceId}__` ? ++points : points;
    }, 0);
    return {
      files: data.output?.file ? [{ key: data.output.file, body: JSON.stringify({ answers: answers }) }] : [],
      points,
    };
  };

  useImperativeHandle(ref, () => ({
    snapshot,
    execute(action) {
      switch (action) {
        case Action.Reset:
          setChoiceIds((prev) => [...prev, ...answers.map((answer) => answer.choiceId)]);
          setAnswers([]);
          return true;
        default:
          return false;
      }
    },
  }));

  useEffect(() => {
    let answers: Answer[] = [];
    if (data.initial?.file) {
      const [file] = parent.request(Resource.Files, [data.initial.file]);
      answers = JSON.parse(file?.body || '{}')?.answers || [];
    }
    if (answers.length) {
      const choiceIds = answers.map((answer) => answer.choiceId);
      setChoiceIds(Array.from(m.keys()).filter((choiceId) => !choiceIds.includes(choiceId)));
      setAnswers(answers);
    } else {
      setChoiceIds(Array.from(m.keys()));
    }
  }, [data.initial?.file]);

  useEffect(() => {
    const { files, points } = snapshot();
    onChange(files, points);
  }, [answers]);

  return (
    <CallistoContext.Provider
      value={{
        m,
        choiceIds,
        answers,

        fillBlank(blankId, choiceId) {
          let origin: number | undefined;
          let target: number | undefined;
          for (let i = 0; i < answers.length; i++) {
            if (answers[i].blankId === blankId) target = i;
            if (answers[i].choiceId === choiceId) origin = i;
          }
          if (origin !== undefined && target !== undefined) {
            const temp = answers[origin].blankId;
            setAnswers((prev) => {
              return prev.map((answer, i) => {
                if (i === origin) return { ...answer, blankId: prev[target!].blankId };
                if (i === target) return { ...answer, blankId: temp };
                return answer;
              });
            });
          } else if (origin === undefined && target !== undefined) {
            setChoiceIds((prev) => [...prev.filter((id) => id !== choiceId), answers[target!].choiceId]);
            setAnswers((prev) => {
              return prev.map((answer, i) => {
                if (i === target) return { ...answer, choiceId };
                return answer;
              });
            });
          } else {
            setChoiceIds((prev) => prev.filter((id) => id !== choiceId));
            setAnswers((prev) => [
              ...prev.filter((answer) => answer.blankId !== blankId && answer.choiceId !== choiceId),
              { blankId, choiceId },
            ]);
          }
        },
        putBackChoice(choiceId) {
          const index = answers.findIndex((answer) => answer.choiceId === choiceId);
          if (index === -1) return;
          setChoiceIds((prev) => [...prev, choiceId]);
          setAnswers((prev) => prev.filter((_, i) => i !== index));
        },
      }}
    >
      {children}
    </CallistoContext.Provider>
  );
});

export const useCallisto = () => useContext(CallistoContext);
