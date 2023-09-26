import React, { useMemo } from 'react';

import { Point, generateEvenlySpacedCoordinates } from 'libs/cube3dUtils';
import useRotation from 'hooks/useRotation';

interface CubePointProps {
  point: Point;
  rotation: number;
  children?: React.ReactNode;
  scale?: number;
}

function CubeVertex({
  point, children, rotation, scale = 1,
}: CubePointProps) {
  const style: React.CSSProperties = {
    transform: `translate3d(${point.x * scale}rem, ${point.y * scale}rem, ${point.z * scale}rem)`,
    transformStyle: 'preserve-3d',
  };
  return (
    <div className="absolute" style={style}>
      <div
        style={{
          transform: `rotateY(-${rotation}turn)`,
        }}
        className="text-2xl transition-transform duration-[100s] ease-linear"
      >
        {children}
      </div>
    </div>
  );
}

function Cube3D() {
  const { rotation } = useRotation(4);
  const vertices: Point[] = useMemo(() => [
    { x: 2, y: 2, z: 0 },
    { x: 0, y: 4.8285, z: 2 },
    { x: 4, y: 4.8285, z: 2 },
    { x: 4, y: 4.8285, z: -2 },
    { x: 0, y: 4.8285, z: -2 },
  ], []);
  const scale = 4;
  return (
    <div
      style={{
        transform: `rotateX(-0.1turn) rotateY(${rotation}turn)`,
        transformStyle: 'preserve-3d',
        height: `${scale * 8}rem`,
        width: `${scale * 4}rem`,
      }}
      className="relative transition-transform duration-[100s] ease-linear"
    >
      {[...vertices, ...generateEvenlySpacedCoordinates(vertices, 3)].map((point) => (
        <CubeVertex key={`${JSON.stringify(point)}`} point={point} rotation={rotation} scale={scale}>
          *
        </CubeVertex>
      ))}
    </div>
  );
}

export default Cube3D;
