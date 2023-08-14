'use client';

import { useEffect } from 'react';

interface SideBarProps {
  children: React.ReactNode;
}

function SideBar({ children }: SideBarProps) {
  useEffect(() => {
    const ewResizableDiv = document.querySelector<HTMLDivElement>('.ew-resizable');
    const ewSliderDiv = document.querySelector<HTMLDivElement>('.ew-slider');
    if (!ewResizableDiv || !ewSliderDiv) {
      return () => { };
    }

    const handleMouseDown = (mouseDownEvent: MouseEvent) => {
      const startX = mouseDownEvent.clientX;
      const startWidth = ewResizableDiv.clientWidth;

      const handleMouseMove = (mouseUpEvent: MouseEvent) => {
        const newWidth = startWidth + mouseUpEvent.clientX - startX;
        ewResizableDiv.style.width = `${newWidth}px`;
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    ewSliderDiv.addEventListener('mousedown', handleMouseDown);

    return () => {
      ewSliderDiv.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div
      className="ew-resizable relative border-r-[1px] border-border-primary"
    >
      <div className="overflow-hidden text-ellipsis">
        {children}
      </div>
      <div className="ew-slider absolute right-0 top-0 h-full w-[6px] translate-x-[3px] bg-primary
      opacity-0 transition-opacity hover:opacity-100"
      />
    </div>
  );
}

export default SideBar;
