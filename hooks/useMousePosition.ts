import { useState, useEffect } from 'react';

import throttle from 'libs/throttle';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const handleMouseMoveThrottle = throttle(handleMouseMove, 100);
    window.addEventListener('mousemove', handleMouseMoveThrottle);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveThrottle);
    };
  }, []);
  return mousePosition;
};

export default useMousePosition;
