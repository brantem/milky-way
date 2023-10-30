import { createContext, useContext, useState } from 'react';

type Item = [key: string, value: string];

type AppState = {
  choices: string[];
  items: Item[];
  addValue(key: string, value: string): void;
  removeValue(value: string): void;
};

const AppContext = createContext<AppState>({
  choices: [],
  items: [],
  addValue() {},
  removeValue() {},
});

type AppProviderProps = {
  choices: string[];
  children: React.ReactNode;
};

export const AppProvider = ({ choices: _choices, children }: AppProviderProps) => {
  const [choices, setChoices] = useState<string[]>(() => _choices);
  const [items, setItems] = useState<Item[]>([]);
  return (
    <AppContext.Provider
      value={{
        choices,
        items,
        addValue(key, value) {
          setItems((prev) => {
            let origin, target;
            for (let i = 0; i < prev.length; i++) {
              if (prev[i][0] === key) target = i;
              if (prev[i][1] === value) origin = i;
            }
            if (origin !== undefined && target !== undefined) {
              const items = prev.slice();
              const temp = items[origin][0];
              items[origin][0] = items[target][0];
              items[target][0] = temp;
              return items;
            } else {
              setChoices((prev) => prev.filter((choice) => choice !== value)); // i don't think this is good
              return [...prev.filter((item) => item[0] !== key && item[1] !== value), [key, value]];
            }
          });
        },
        removeValue(value) {
          setChoices((prev) => [...prev, value]);
          setItems((prev) => prev.filter((item) => item[1] !== value));
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppState = () => useContext(AppContext);
