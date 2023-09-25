import { twMerge } from 'tailwind-merge';

interface ButtonHoverTitleProps {
  title: string;
  position: 'right' | 'bottom';
  className?: string;
}

function ButtonHoverTitle({ title, position, className }: ButtonHoverTitleProps) {
  let positionClass = '';
  switch (position) {
    case 'right':
      positionClass = 'left-[calc(100%+5px)] inset-y-0';
      break;
    case 'bottom':
      positionClass = 'top-[calc(100%+5px)] inset-x-0';
      break;
    default:
      break;
  }

  return (
    <div className={twMerge(
      'z-20 invisible absolute flex justify-center items-center opacity-0 transition-opacity delay-75 duration-150',
      positionClass,
      className,
    )}
    >
      {position === 'right' && (
      <div className="relative rounded-[4px] border-[1px] border-border-primary
      bg-additional px-3 py-1"
      >
        <div className="absolute inset-y-0 left-[-5px] flex items-center">
          <div className="z-30 h-1 rotate-45 border-b-[1px] border-l-[1px] border-border-primary
          bg-additional p-1"
          />
        </div>
        <p className="whitespace-nowrap text-text-primary">
          {title}
        </p>
      </div>
      )}
      {position === 'bottom' && (
        <div className="relative rounded-[4px] border-[1px] border-border-primary bg-additional px-3 py-1 ">
          <div className="absolute inset-x-0 top-[-5px] flex flex-col items-center">
            <div className="z-30 h-1 rotate-[135deg] border-b-[1px] border-l-[1px] border-border-primary
            bg-additional p-1"
            />
          </div>
          <p className="whitespace-nowrap text-text-primary">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}

export default ButtonHoverTitle;
