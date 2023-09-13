'use client';

import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import useActivityBarStore from 'hooks/useActivityBarStore';

import SideBarProfile from './SideBarProfile';
import SideBarWorks from './SideBarWorks';
import SideBarSearch from './SideBarSearch';
import SideBarExplorer from './SideBarExplorer';

function SideBar() {
  const { activityBarState, isActivityBarOpen } = useActivityBarStore();

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
        if (newWidth > 200) {
          ewResizableDiv.style.width = `${newWidth}px`;
        } else {
          ewResizableDiv.style.width = '200px';
          ewSliderDiv.style.opacity = '100';
        }
        if (newWidth < 100) {
          ewResizableDiv.style.width = '3px';
          ewSliderDiv.style.opacity = '100';
        }
      };

      const handleMouseUp = () => {
        ewSliderDiv.removeAttribute('style');
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
    <div
      className="ew-resizable relative flex-none overflow-hidden border-r-[1px] border-border-primary"
      style={{ width: isActivityBarOpen ? '' : '3px' }}
    >
      <div className={twMerge('h-full w-full', activityBarState === 'profile' ? '' : 'hidden')}>
        <SideBarProfile />
      </div>
      <div className={twMerge('h-full w-full', activityBarState === 'works' ? '' : 'hidden')}>
        <SideBarWorks />
      </div>
      <div className={twMerge('h-full w-full', activityBarState === 'explorer' ? '' : 'hidden')}>
        <SideBarExplorer />
      </div>
      <div className={twMerge('h-full w-full', activityBarState === 'search' ? '' : 'hidden')}>
        <SideBarSearch />
      </div>
      <div className="ew-slider absolute right-0 top-0 h-full w-[6px] bg-primary
      opacity-0 transition-opacity hover:opacity-100"
      />
    </div>
  );
}

export default SideBar;
