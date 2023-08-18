'use client';

import { useEffect } from 'react';

import useActivityBarStore from 'hooks/useActivityBarStore';

interface SideBarProps {
  children: React.ReactNode;
}

function SideBar({ children }: SideBarProps) {
  const { activityBarState } = useActivityBarStore();
  useEffect(() => {
    const ewResizableDiv = document.querySelector<HTMLDivElement>('.ew-resizable');
    const ewSliderDiv = document.querySelector<HTMLDivElement>('.ew-slider');
    const mainElement = document.getElementById('main');
    const activityBarElement = document.getElementById('activity-bar');
    if (!ewResizableDiv || !ewSliderDiv || !mainElement || !activityBarElement) {
      return () => { };
    }
    ewResizableDiv.style.width = activityBarState === 'hide' ? '0px' : '360px';
    const ewResizableDivRect = ewResizableDiv.getBoundingClientRect();
    const activityBarElementRect = activityBarElement.getBoundingClientRect();
    mainElement.style.width = activityBarState === 'hide'
      ? `${window.innerWidth - activityBarElementRect.right}px`
      : `${window.innerWidth - ewResizableDivRect.right}px`;

    const handleMouseDown = (mouseDownEvent: MouseEvent) => {
      const startX = mouseDownEvent.clientX;
      const startWidth = ewResizableDiv.clientWidth;

      const handleMouseMove = (mouseUpEvent: MouseEvent) => {
        const newWidth = startWidth + mouseUpEvent.clientX - startX;
        ewResizableDiv.style.width = `${newWidth}px`;
        mainElement.style.width = `${window.innerWidth - ewResizableDiv.getBoundingClientRect().right}px`;
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
  }, [activityBarState]);

  return (
    <div className="ew-resizable relative overflow-x-hidden border-r-[1px] border-border-primary">
      {children}
      <div className="ew-slider absolute right-0 top-0 h-full w-[6px] translate-x-[3px] bg-primary
      opacity-0 transition-opacity hover:opacity-100"
      />
    </div>
  );
}

export default SideBar;
