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
      underlyingElement.classList.remove('invisible');
      if (hovered) {
        underlyingElement.style.clipPath = `circle(200px at ${relativeX}px ${relativeY}px)`;
      } else {
        underlyingElement.style.clipPath = `circle(20px at ${relativeX}px ${relativeY}px)`;
      }
    };

    const handleMousemoveOnParent = throttle(setPosition, 100);
    const handleMouseEnterHoverZone = (event: MouseEvent) => {
      setHovered(true);
      setPosition(event);
    };

    const handleMouseMoveOnHoverZone = () => {
      setHovered(true);
    };

    const handleMouseLeaveHoverZone = () => {
      setHovered(false);
    };

    const handleMouseLeaveParent = () => {
      underlyingElement.removeAttribute('style');
      underlyingElement.classList.add('invisible');
    };

    parentElement.addEventListener('mousemove', handleMousemoveOnParent);
    parentElement.addEventListener('mouseleave', handleMouseLeaveParent);
    hoverElement.addEventListener('mouseenter', handleMouseEnterHoverZone);
    hoverElement.addEventListener('mousemove', handleMouseMoveOnHoverZone);
    hoverElement.addEventListener('mouseleave', handleMouseLeaveHoverZone);

    return () => {
      parentElement.removeEventListener('mousemove', handleMousemoveOnParent);
      parentElement.removeEventListener('mouseleave', handleMouseLeaveParent);
      hoverElement.removeEventListener('mouseenter', handleMouseEnterHoverZone);
      hoverElement.removeEventListener('mousemove', handleMouseMoveOnHoverZone);
      hoverElement.removeEventListener('mouseleave', handleMouseLeaveHoverZone);
    };
  }, [parentId, hoverElementId, hovered]);

  return (
    <div
      id="underlying"
      className={twMerge('pointer-events-none invisible', className)}
    >
      {children}
    </div>
  );
}

export default Underlying;
