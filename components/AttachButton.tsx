import throttle from 'libs/throttle';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface AttachButtonProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function AttachButton({
  title, children, className, onClick,
}: AttachButtonProps) {
  useEffect(() => {
    const attachOuterElement = document.getElementById(`attach-outer-${title}`);
    const attachInnerElement = document.getElementById(`attach-inner-${title}`);
    if (!attachInnerElement || !attachOuterElement) return () => {};

    const setInnerPosition = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const outerElementHeight = attachOuterElement.getBoundingClientRect().height;
      const outerElementWidth = attachOuterElement.getBoundingClientRect().width;
      const relativeX = mouseX - attachOuterElement.getBoundingClientRect().left - outerElementWidth / 2;
      const relativeY = mouseY - attachOuterElement.getBoundingClientRect().top - outerElementHeight / 2;
      attachInnerElement.style.transform = `translateX(${relativeX}px) translateY(${relativeY}px)`;
    };

    const handleMouseLeaveOuter = () => {
      attachInnerElement.style.transform = '';
    };

    const handleMouseMoveOnOuter = throttle(setInnerPosition, 100);

    attachOuterElement.addEventListener('mousemove', handleMouseMoveOnOuter);
    attachOuterElement.addEventListener('mouseleave', handleMouseLeaveOuter);

    return () => {
      attachOuterElement.removeEventListener('mousemove', handleMouseMoveOnOuter);
      attachOuterElement.removeEventListener('mouseleave', handleMouseLeaveOuter);
    };
  });
  return (
    <div
      id={`attach-outer-${title}`}
      className={twMerge('p-8', className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={onClick}
    >
      <div id={`attach-inner-${title}`} className="pointer-events-none transition-all">
        {children}
      </div>
    </div>
  );
}

export default AttachButton;
