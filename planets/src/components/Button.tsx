import { cn } from '../lib/helpers';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  className?: string;
  shadowClassName?: string;
  contentClassName?: string;
};

const Button = ({ className, shadowClassName, contentClassName, children, ...props }: ButtonProps) => {
  return (
    <button className={cn('group h-9 relative', className)} {...props}>
      <span className={cn('absolute right-0 left-0 h-full w-full rounded-lg transition-all', shadowClassName)} />
      <span
        className={cn(
          'relative rounded-lg group-enabled:group-hover:brightness-110 z-10 h-full w-full flex items-center justify-center group-enabled:[transform:translate3d(0,-2px,0)] group-enabled:group-hover:[transform:translate3d(0,-3px,0)] group-enabled:active:![transform:translate3d(0,0,0)] transition-all group-disabled:cursor-not-allowed font-medium text-sm',
          contentClassName,
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
