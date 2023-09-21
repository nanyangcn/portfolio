import throttle from 'libs/throttle';
import React, { useEffect } from 'react';

interface UnderlyingProps {
  children: React.ReactNode;
}

function Underlying({ children }: UnderlyingProps) {
  useEffect(() => {
    const contentElement = document.getElementById('profile-content');
    const underlyingElement = document.getElementById('underlying');

    if (!contentElement || !underlyingElement) return () => { };

    const setPosition = (event: MouseEvent) => {
      const relativeX = event.clientX - contentElement.getBoundingClientRect().left;
      const relativeY = event.clientY - contentElement.getBoundingClientRect().top;
      if (event.clientY < 500) {
        underlyingElement.style.transition = 'clip-path 0.5s';
        underlyingElement.style.clipPath = 'circle(250px at 250px 100px)';
      } else {
        underlyingElement.style.transition = 'none';
        underlyingElement.style.clipPath = `circle(10px at ${relativeX}px ${relativeY}px)`;
      }
    };

    const handleMousemove = throttle(setPosition, 100);

    contentElement.addEventListener('mousemove', handleMousemove);
    return () => {
      contentElement.removeEventListener('mousemove', handleMousemove);
    };
  }, []);
  return (
    <div
      id="underlying"
      className="pointer-events-none absolute left-0 top-0 h-[1000px] w-[500px] bg-text-primary"
    >
      <div
        className="text-black"
      >
        {children}
      </div>
    </div>
  );
}

export default Underlying;
