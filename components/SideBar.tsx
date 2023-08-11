'use client';

import { useEffect } from 'react';

interface SideBarProps {
  activityBarState: string | null;
}

function SideBar({ activityBarState }: SideBarProps) {
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

  if (!activityBarState) {
    return null;
  }

  return (
    <div
      className="ew-resizable flex justify-between border-r-[1px] border-neutral-700/50"
    >
      <div className="overflow-hidden text-ellipsis">
        SideBar
      </div>
      <div className="ew-slider h-full w-[6px] translate-x-[3px] bg-[#0078D4]
      opacity-0 transition-opacity hover:opacity-100"
      />
    </div>
  );
}

export default SideBar;
