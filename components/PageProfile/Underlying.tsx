import React, { useEffect, useState } from 'react';

import throttle from 'libs/throttle';
import { twMerge } from 'tailwind-merge';

interface UnderlyingProps {
  children: React.ReactNode;
  parentId: string;
  hoverElementId: string;
  className?: string;
}

function Underlying({
  children, parentId, hoverElementId, className,
}: UnderlyingProps) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const parentElement = document.getElementById(parentId);
    const underlyingElement = document.getElementById('underlying');
    const hoverElement = document.getElementById(hoverElementId);
    if (!parentElement || !underlyingElement || !hoverElement) return () => { };

    const setPosition = (event: MouseEvent) => {
      const relativeX = event.clientX - underlyingElement.getBoundingClientRect().left;
      const relativeY = event.clientY - underlyingElement.getBoundingClientRect().top;
      underlyingElement.style.transition = 'clip-path 0.3s';
      underlyingElement.classList.remove('hidden');
      if (hovered) {
        underlyingElement.style.clipPath = `circle(200px at ${relativeX}px ${relativeY}px)`;
      } else {
        underlyingElement.style.clipPath = `circle(20px at ${relativeX}px ${relativeY}px)`;
      }
    };

    const handleMousemove = throttle(setPosition, 100);
    const handleMouseEnter = (event: MouseEvent) => {
      setHovered(true);
      setPosition(event);
    };
    const handleMouseLeave = () => {
      setHovered(false);
    };

    const handleMouseLeaveParent = () => {
      underlyingElement.removeAttribute('style');
      underlyingElement.classList.add('hidden');
    };

    parentElement.addEventListener('mousemove', handleMousemove);
    parentElement.addEventListener('mouseleave', handleMouseLeaveParent);
    hoverElement.addEventListener('mouseenter', handleMouseEnter);
    hoverElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMousemove);
      parentElement.removeEventListener('mouseleave', handleMouseLeaveParent);
      hoverElement.removeEventListener('mouseenter', handleMouseEnter);
      hoverElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [parentId, hoverElementId, hovered]);

  return (
    <div
      id="underlying"
      className={twMerge('pointer-events-none hidden', className)}
    >
      {children}
    </div>
  );
}

export default Underlying;
