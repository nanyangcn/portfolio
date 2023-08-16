import { twMerge } from 'tailwind-merge';

interface ButtonHoverTitleProps {
  title: string;
  className?: string;
}

function ButtonHoverTitle({ title, className }: ButtonHoverTitleProps) {
  return (
    <div className={twMerge(
      'z-20 invisible absolute left-full flex items-center opacity-0 transition-opacity delay-75 duration-150',
      className,
    )}
    >
      {/* on right */}
      <div className="z-30 h-1 rotate-45 border-b-[1px] border-l-[1px] border-border-primary bg-additional p-1" />
      <div className="translate-x-[-5px] rounded-[4px] border-[1px] border-border-primary
      bg-additional px-3 py-1 text-text-primary"
      >
        {title}
      </div>
    </div>
  );
}

export default ButtonHoverTitle;
