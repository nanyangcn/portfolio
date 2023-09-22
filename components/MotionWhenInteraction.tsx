import React, { useEffect, useRef, useState } from 'react';

interface MotionWhenInteractionProps {
  startStyle: React.CSSProperties
  endStyle: React.CSSProperties
  children?: React.ReactNode
  threshold?: number
  className?: string
  debug?: boolean
}

function MotionWhenInteraction({
  children, startStyle, endStyle, threshold = 0.75, className, debug = false,
}: MotionWhenInteractionProps) {
  const isAnimated = useRef(false);
  const childRef = useRef(null);
  const [elementStyle, setElementStyle] = useState<React.CSSProperties>(startStyle);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (isAnimated.current) return;
        if (entry.isIntersecting) {
          setElementStyle(endStyle);
          isAnimated.current = true;
        } else {
          setElementStyle(startStyle);
        }
      });
    };
    const observer = new IntersectionObserver(
      handleIntersect,
      {
        root: null,
        rootMargin: '0px',
        threshold,
      },
    );
    if (childRef.current) {
      observer.observe(childRef.current);
    }
  }, [startStyle, endStyle, threshold, debug]);

  return (
    <div ref={childRef} style={elementStyle} className={className}>
      {children}
    </div>
  );
}

export default MotionWhenInteraction;
