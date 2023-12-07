import { createContext, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';

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
  snapshot(): Promise<{ files: File[]; points: number }>;
  execute(action: Action.Reset): Promise<boolean>;
};

export type ProviderProps = {
  parent: {
    id: string;
    request(resource: Resource.Files, keys: string[]): Promise<(File | null)[]>;
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
  const [m, setM] = useState<State['m']>(new Map());
  const [choiceIds, setChoiceIds] = useState<State['choiceIds']>([]);
  const [answers, setAnswers] = useState<State['answers']>([]);
  const [isReady, setIsReady] = useState(false);

  const snapshot = () => {
    const points = answers.reduce((points, answer) => {
      return answer.blankId === `__${answer.choiceId}__` ? ++points : points;
    }, 0);
    return {
      files: data.output?.file ? [{ key: data.output.file, body: JSON.stringify({ answers: answers }) }] : [],
      points,
    };
  };

  useImperativeHandle(ref, () => ({
    async snapshot() {
      return snapshot();
    },
    async execute(action) {
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
    (async () => {
      const obj: Pick<State, 'm' | 'choiceIds' | 'answers'> = {
        m: new Map<Choice['id'], Choice>(),
        choiceIds: [],
        answers: [],
      };

      let choices = data.choices.items || [];
      if (data.choices.shuffle) choices = shuffle(choices, id);
      choices.forEach((choice) => obj.m.set(choice.id, choice));
      obj.choiceIds = Array.from(obj.m.keys());

      const keys = [];
      if (data.initial?.file) keys.push(data.initial.file);
      if (data.output?.file) keys.push(data.output?.file);
      if (keys.length) {
        const [initial, output] = await parent.request(Resource.Files, keys);
        const answers: Answer[] = JSON.parse((output || initial)?.body || '{}').answers || [];
        if (answers.length) {
          const choiceIds = answers.map((answer) => answer.choiceId);
          obj.choiceIds = obj.choiceIds.filter((choiceId) => !choiceIds.includes(choiceId));
          obj.answers = answers;
        }
      }

      setM(obj.m);
      setChoiceIds(obj.choiceIds);
      setAnswers(obj.answers);
      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!isReady) return;
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
