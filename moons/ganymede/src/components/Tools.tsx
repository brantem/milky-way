import { useAppState } from '../lib/state';

const Button = (props: Omit<React.ComponentPropsWithoutRef<'button'>, 'className'>) => {
  return (
    <button
      {...props}
      className="border-0 h-10 w-10 bg-neutral-100 flex items-center justify-center text-neutral-500 hover:enabled:bg-neutral-200 hover:enabled:scale-110 hover:rounded-md enabled:cursor-pointer disabled:bg-neutral-50 disabled:text-neutral-300"
    />
  );
};

const UndoButton = () => {
  const [state, set] = useAppState();
  return (
    <Button onClick={() => set.n++} disabled={!state.visiblePaths.length}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height={20} width={20}>
        <path
          fillRule="evenodd"
          d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  );
};

const RedoButton = () => {
  const [state, set] = useAppState();
  return (
    <Button onClick={() => set.n--} disabled={!state.n}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height={20} width={20}>
        <path
          fillRule="evenodd"
          d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  );
};

const ClearButton = () => {
  const [state, set] = useAppState();
  return (
    <Button onClick={set.clear} disabled={!state.paths.length}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height={20} width={20}>
        <path
          fillRule="evenodd"
          d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  );
};

const Tools = () => {
  return (
    <div className="flex [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md">
      <UndoButton />
      <RedoButton />
      <ClearButton />
    </div>
  );
};

export default Tools;
