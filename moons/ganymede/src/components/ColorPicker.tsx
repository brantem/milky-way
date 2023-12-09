import { useAppState } from '../lib/state';

const colors = ['#000', '#ef4444', '#f59e0b', '#84cc16', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'] as const;

const ColorPicker = () => {
  const [state, set] = useAppState();
  return (
    <div className="flex [&>div:first-child]:rounded-l-md [&>div:last-child]:rounded-r-md">
      {colors.map((color) => (
        <div
          key={color}
          className={[
            'h-10 w-10 relative cursor-pointer flex-shrink-0',
            color === state.color
              ? 'scale-[1.15] rounded-md z-10 shadow-lg'
              : 'hover:z-[11] hover:scale-110 hover:rounded-md hover:shadow-md',
          ].join(' ')}
          style={{ backgroundColor: color }}
          onClick={() => (set.color = color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
