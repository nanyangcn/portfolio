import { twMerge } from 'tailwind-merge';

interface ButtonHoverTitleProps {
  title: string;
  className?: string;
}

function ButtonHoverTitle({ title, className }: ButtonHoverTitleProps) {
  return (
    <div className={twMerge(
      'invisible absolute left-full flex items-center opacity-0 transition-opacity delay-75 duration-150',
      className,
    )}
    >
      {/* on right */}
      <div className="z-30 h-1 rotate-45 border-b-[1px] border-l-[1px] border-neutral-700 bg-neutral-800 p-1" />
      <div className="translate-x-[-5px] rounded-[4px] border-[1px] border-neutral-700
      bg-neutral-800 px-3 py-1 text-neutral-300"
      >
        {title}
      </div>
    </div>
  );
}

export default ButtonHoverTitle;
