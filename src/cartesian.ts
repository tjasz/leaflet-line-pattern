export type Point = { x: number; y: number };

/**
 * @param x 
 * @returns The square of a number `x`: (x*x).
 */
function square(x: number) {
  return x * x;
}

/**
 * @param p
 * @returns The L2 norm of a point `p`: the Euclidean distance to the origin.
 */
function L2norm(p: Point) {
  return Math.sqrt(square(p.x) + square(p.y));
}

/**
 * @param p1 
 * @param p2 
 * @returns The Euclidean distance between two points `p1` and `p2`.
 */
export function dist(p1: Point, p2: Point) {
  return L2norm({ x: p1.x - p2.x, y: p1.y - p2.y });
}

/**
 * Get the bearing in radians from point `p1` to point `p2`.
 * @param p1 The origin point
 * @param p2 The destination point
 * @returns The bearing in radians from point `p1` to point `p2`
 */
export function bearing(p1: Point, p2: Point) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

/**
 * Return the point that results from moving an initial point along a bearing
 * for a distance.
 * @param initialPoint The initial point
 * @param distance The distance along the bearing to move
 * @param bearingRadians The bearing in radians along which to move
 * @returns The point that is the result of moving `p` by `dist` units along `bearingRadians`.
 */
export function moveAlongBearing(
  initialPoint: Point,
  distance: number,
  bearingRadians: number
): Point {
  return {
    x: initialPoint.x + distance * Math.cos(bearingRadians),
    y: initialPoint.y + distance * Math.sin(bearingRadians),
  }
}

/**
 * Return the point that results from rotating an initial point
 * for a given amount around an axis point.
 * @param initialPoint The initial point
 * @param rotationRadians The amount to rotate around the axis
 * @param axisPoint The point to rotate around (defaults to the origin 0,0)
 * @returns 
 */
export function rotateAroundPoint(
  initialPoint: Point,
  rotationRadians: number,
  axisPoint: Point = { x: 0, y: 0 },
): Point {
  const magnitude = dist(axisPoint, initialPoint);
  const originalBearing = bearing(axisPoint, initialPoint);
  const result: Point = {
    x: axisPoint.x + magnitude * Math.cos(originalBearing + rotationRadians),
    y: axisPoint.y + magnitude * Math.sin(originalBearing + rotationRadians),
  };
  return result;
}