export type Point = { x: number; y: number };

function square(x: number) {
  return x * x;
}

function L2norm(x: number, y: number) {
  return Math.sqrt(square(x) + square(y));
}

export function dist(p1: Point, p2: Point) {
  return L2norm(p1.x - p2.x, p1.y - p2.y);
}

export function moveAlongBearing(
  p: Point,
  dist: number,
  bearingRadians: number
): Point {
  return {
    x: p.x + dist * Math.cos(bearingRadians),
    y: p.y + dist * Math.sin(bearingRadians),
  }
}

export function rotateAroundOrigin(p: Point, radians: number): Point {
  const magnitude = L2norm(p.x, p.y);
  const originalBearing = Math.atan2(p.y, p.x);
  const result: Point = {
    x: magnitude * Math.cos(originalBearing + radians),
    y: magnitude * Math.sin(originalBearing + radians),
  };
  return result;
}