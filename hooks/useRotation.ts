import { useState, useEffect, useRef } from 'react';

interface RotationHook {
  rotation: number;
  stopRotation: () => void;
}

const useRotation = (spinSpeed: number): RotationHook => {
  const [rotation, setRotation] = useState<number>(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateRotation = () => {
      setRotation((prev) => (prev + spinSpeed));
    };
    updateRotation();
    intervalIdRef.current = setInterval(() => {
      updateRotation();
    }, 1000 * 100);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [spinSpeed]);

  const stopRotation = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  return {
    rotation,
    stopRotation,
  };
};

export default useRotation;
