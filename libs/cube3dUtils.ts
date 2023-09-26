export interface Point {
  x: number;
  y: number;
  z: number;
}

const interpolatePoints = (point1: Point, point2: Point, count: number): Point[] => {
  if (count <= 0) {
    return [];
  }

  const step = 1 / (count + 1); // +1 to exclude start and end points

  return Array.from({ length: count }, (_, i) => {
    const t = step * (i + 1);
    return {
      x: point1.x + (point2.x - point1.x) * t,
      y: point1.y + (point2.y - point1.y) * t,
      z: point1.z + (point2.z - point1.z) * t,
    };
  });
};

export const generateEvenlySpacedCoordinates = (vertices: Point[], count: number): Point[] => {
  if (vertices.length !== 5) {
    throw new Error('A pyramid must have exactly five vertices.');
  }

  const edges = [
    [vertices[0], vertices[1]],
    [vertices[0], vertices[2]],
    [vertices[0], vertices[3]],
    [vertices[0], vertices[4]],
    [vertices[1], vertices[2]],
    [vertices[2], vertices[3]],
    [vertices[3], vertices[4]],
    [vertices[1], vertices[4]],
  ] as Point[][];

  return edges.reduce((result, edge) => [...result, ...interpolatePoints(edge[0]!, edge[1]!, count)], []);
};
