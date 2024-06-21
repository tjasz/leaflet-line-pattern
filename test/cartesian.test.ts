import { describe, it, expect } from "@jest/globals"
import { dist, bearing, moveAlongBearing, rotateAroundPoint, Point } from "../src/cartesian"

const root2 = Math.sqrt(2);
const halfRoot3 = Math.sqrt(3) / 2;

const deg30 = Math.PI / 6;
const deg60 = 2 * deg30;
const deg90 = 3 * deg30;
const deg120 = 4 * deg30;
const deg150 = 5 * deg30;
const deg180 = 6 * deg30;
const deg210 = 7 * deg30;
const deg240 = 8 * deg30;
const deg270 = 9 * deg30;
const deg300 = 10 * deg30;
const deg330 = 11 * deg30;
const degNeg60 = -2 * deg30;
const degNeg90 = -3 * deg30;
const degNeg120 = -4 * deg30;
const degNeg150 = -5 * deg30;
const degNeg30 = -Math.PI / 6;

const deg45 = Math.PI / 4;
const deg135 = 3 * Math.PI / 4;
const deg225 = 5 * Math.PI / 4;
const deg315 = 7 * Math.PI / 4;
const degNeg45 = -Math.PI / 4;
const degNeg135 = -3 * Math.PI / 4;

describe("distance between points", () => {
  it.each<[[Point, Point], number]>([
    // equal points have 0 distance
    [[{ x: 0, y: 0 }, { x: 0, y: 0 }], 0],
    [[{ x: 1, y: 1 }, { x: 1, y: 1 }], 0],
    // move the second point by 1 in each direction
    [[{ x: 0, y: 0 }, { x: -1, y: 0 }], 1],
    [[{ x: 0, y: 0 }, { x: 1, y: 0 }], 1],
    [[{ x: 0, y: 0 }, { x: 0, y: -1 }], 1],
    [[{ x: 0, y: 0 }, { x: 0, y: 1 }], 1],
    // move the first point by 1 in each direction
    // ensure it works when none of the coordinates are 0
    [[{ x: 1, y: 2 }, { x: 2, y: 2 }], 1],
    [[{ x: 3, y: 2 }, { x: 2, y: 2 }], 1],
    [[{ x: 2, y: 1 }, { x: 2, y: 2 }], 1],
    [[{ x: 2, y: 3 }, { x: 2, y: 2 }], 1],
    // try some well known pythagorean triples
    [[{ x: 2, y: 3 }, { x: -1, y: -1 }], 5],
    [[{ x: 2, y: 3 }, { x: -2, y: 6 }], 5],
    [[{ x: 2, y: 3 }, { x: -3, y: -9 }], 13],
    [[{ x: 2, y: 3 }, { x: -10, y: -2 }], 13],
  ])(
    "dist(%p)",
    (args: [Point, Point], expected: number) => {
      expect(dist(...args)).toEqual(expected);
    }
  )
})

describe("bearing from point to point", () => {
  it.each<[[Point, Point], number]>([
    // the bearing between equal points is defined as 0, could be anything
    [[{ x: 0, y: 0 }, { x: 0, y: 0 }], 0],
    [[{ x: 1, y: 1 }, { x: 1, y: 1 }], 0],
    // try the unit circle in 30 degree increments
    [[{ x: 0, y: 0 }, { x: 1, y: 0 }], 0],
    [[{ x: 0, y: 0 }, { x: halfRoot3, y: 0.5 }], deg30],
    [[{ x: 0, y: 0 }, { x: 0.5, y: halfRoot3 }], deg60],
    [[{ x: 0, y: 0 }, { x: 0, y: 1 }], deg90],
    [[{ x: 0, y: 0 }, { x: -0.5, y: halfRoot3 }], deg120],
    [[{ x: 0, y: 0 }, { x: -halfRoot3, y: 0.5 }], deg150],
    [[{ x: 0, y: 0 }, { x: -1, y: 0 }], deg180],
    [[{ x: 0, y: 0 }, { x: -halfRoot3, y: -0.5 }], degNeg150],
    [[{ x: 0, y: 0 }, { x: -0.5, y: -halfRoot3 }], degNeg120],
    [[{ x: 0, y: 0 }, { x: 0, y: -1 }], degNeg90],
    [[{ x: 0, y: 0 }, { x: 0.5, y: -halfRoot3 }], degNeg60],
    [[{ x: 0, y: 0 }, { x: halfRoot3, y: -0.5 }], degNeg30],
    // try the unit circle in 45 degree increments
    [[{ x: 0, y: 0 }, { x: 1, y: 1 }], deg45],
    [[{ x: 0, y: 0 }, { x: -1, y: 1 }], deg135],
    [[{ x: 0, y: 0 }, { x: -1, y: -1 }], degNeg135],
    [[{ x: 0, y: 0 }, { x: 1, y: -1 }], degNeg45],
  ])(
    "bearing(%p)",
    (args: [Point, Point], expected: number) => {
      expect(bearing(...args)).toBeCloseTo(expected, 14);
    }
  )
})

describe("move along bearing", () => {
  it.each<[[Point, number, number], Point]>([
    // moving 0 distance in any direction ends up at the same point
    [[{ x: 0, y: 0 }, 0, 0], { x: 0, y: 0 }],
    [[{ x: 1, y: 1 }, 0, 1], { x: 1, y: 1 }],
    [[{ x: 2, y: 2 }, 0, 2], { x: 2, y: 2 }],
    [[{ x: 3, y: 3 }, 0, 3], { x: 3, y: 3 }],
    [[{ x: 4, y: 4 }, 0, 4], { x: 4, y: 4 }],
    // test the full unit circle at 30 degree intervals
    [[{ x: 0, y: 0 }, 1, 0 * Math.PI / 6], { x: 1, y: 0 }],
    [[{ x: 0, y: 0 }, 1, 1 * Math.PI / 6], { x: halfRoot3, y: 0.5 }],
    [[{ x: 0, y: 0 }, 1, 2 * Math.PI / 6], { x: 0.5, y: halfRoot3 }],
    [[{ x: 0, y: 0 }, 1, 3 * Math.PI / 6], { x: 0, y: 1 }],
    [[{ x: 0, y: 0 }, 1, 4 * Math.PI / 6], { x: -0.5, y: halfRoot3 }],
    [[{ x: 0, y: 0 }, 1, 5 * Math.PI / 6], { x: -halfRoot3, y: 0.5 }],
    [[{ x: 0, y: 0 }, 1, 6 * Math.PI / 6], { x: -1, y: 0 }],
    [[{ x: 0, y: 0 }, 1, 7 * Math.PI / 6], { x: -halfRoot3, y: -0.5 }],
    [[{ x: 0, y: 0 }, 1, 8 * Math.PI / 6], { x: -0.5, y: -halfRoot3 }],
    [[{ x: 0, y: 0 }, 1, 9 * Math.PI / 6], { x: 0, y: -1 }],
    [[{ x: 0, y: 0 }, 1, 10 * Math.PI / 6], { x: 0.5, y: -halfRoot3 }],
    [[{ x: 0, y: 0 }, 1, 11 * Math.PI / 6], { x: halfRoot3, y: -0.5 }],
    [[{ x: 0, y: 0 }, 1, 12 * Math.PI / 6], { x: 1, y: 0 }],
    // test from a non-zero origin
    [[{ x: 2, y: 3 }, 1, 5 * Math.PI / 6], { x: 2 - halfRoot3, y: 3.5 }],
    // test with a non-unit distance
    [[{ x: 4, y: 5 }, 4, 2 * Math.PI / 6], { x: 6, y: 5 + 4 * halfRoot3 }],
  ])(
    "moveAlongBearing(%p)",
    (args: [Point, number, number], expected: Point) => {
      const result = moveAlongBearing(...args);
      expect(result.x).toBeCloseTo(expected.x, 14);
      expect(result.y).toBeCloseTo(expected.y, 14);
    }
  )
})

describe("rotate around origin", () => {
  it.each<[[Point, number], Point]>([
    // rotating the origin any amount ends up at the same point
    [[{ x: 0, y: 0 }, 0], { x: 0, y: 0 }],
    [[{ x: 0, y: 0 }, 1], { x: 0, y: 0 }],
    [[{ x: 0, y: 0 }, 2], { x: 0, y: 0 }],
    [[{ x: 0, y: 0 }, 3], { x: 0, y: 0 }],
    [[{ x: 0, y: 0 }, 4], { x: 0, y: 0 }],
    // test the full unit circle at 30 degree intervals
    [[{ x: 1, y: 0 }, 0 * Math.PI / 6], { x: 1, y: 0 }],
    [[{ x: 1, y: 0 }, 1 * Math.PI / 6], { x: halfRoot3, y: 0.5 }],
    [[{ x: 1, y: 0 }, 2 * Math.PI / 6], { x: 0.5, y: halfRoot3 }],
    [[{ x: 1, y: 0 }, 3 * Math.PI / 6], { x: 0, y: 1 }],
    [[{ x: 1, y: 0 }, 4 * Math.PI / 6], { x: -0.5, y: halfRoot3 }],
    [[{ x: 1, y: 0 }, 5 * Math.PI / 6], { x: -halfRoot3, y: 0.5 }],
    [[{ x: 1, y: 0 }, 6 * Math.PI / 6], { x: -1, y: 0 }],
    [[{ x: 1, y: 0 }, 7 * Math.PI / 6], { x: -halfRoot3, y: -0.5 }],
    [[{ x: 1, y: 0 }, 8 * Math.PI / 6], { x: -0.5, y: -halfRoot3 }],
    [[{ x: 1, y: 0 }, 9 * Math.PI / 6], { x: 0, y: -1 }],
    [[{ x: 1, y: 0 }, 10 * Math.PI / 6], { x: 0.5, y: -halfRoot3 }],
    [[{ x: 1, y: 0 }, 11 * Math.PI / 6], { x: halfRoot3, y: -0.5 }],
    [[{ x: 1, y: 0 }, 12 * Math.PI / 6], { x: 1, y: 0 }],
    // rotate (1,1) by 45 degree intervals
    [[{ x: 1, y: 1 }, 0 * Math.PI / 4], { x: 1, y: 1 }],
    [[{ x: 1, y: 1 }, 1 * Math.PI / 4], { x: 0, y: root2 }],
    [[{ x: 1, y: 1 }, 2 * Math.PI / 4], { x: -1, y: 1 }],
    [[{ x: 1, y: 1 }, 3 * Math.PI / 4], { x: -root2, y: 0 }],
    [[{ x: 1, y: 1 }, 4 * Math.PI / 4], { x: -1, y: -1 }],
    [[{ x: 1, y: 1 }, 5 * Math.PI / 4], { x: 0, y: -root2 }],
    [[{ x: 1, y: 1 }, 6 * Math.PI / 4], { x: 1, y: -1 }],
    [[{ x: 1, y: 1 }, 7 * Math.PI / 4], { x: root2, y: 0 }],
    [[{ x: 1, y: 1 }, 8 * Math.PI / 4], { x: 1, y: 1 }],
    // try a point where x !== y, rotate by 90deg intervals
    [[{ x: 3, y: 4 }, 0 * Math.PI / 2], { x: 3, y: 4 }],
    [[{ x: 3, y: 4 }, 1 * Math.PI / 2], { x: -4, y: 3 }],
    [[{ x: 3, y: 4 }, 2 * Math.PI / 2], { x: -3, y: -4 }],
    [[{ x: 3, y: 4 }, 3 * Math.PI / 2], { x: 4, y: -3 }],
    [[{ x: 3, y: 4 }, 4 * Math.PI / 2], { x: 3, y: 4 }],
  ])(
    "rotateAroundPoint(%p)",
    (args: [Point, number], expected: Point) => {
      const result = rotateAroundPoint(...args);
      expect(result.x).toBeCloseTo(expected.x, 14);
      expect(result.y).toBeCloseTo(expected.y, 14);
    }
  )
})

describe("rotate around non-origin axis point", () => {
  it.each<[[Point, number, Point], Point]>([
    // rotating a point around itself any amount ends up at the same point
    [[{ x: 1, y: 2 }, 0, { x: 1, y: 2 }], { x: 1, y: 2 }],
    [[{ x: 1, y: 2 }, 1, { x: 1, y: 2 }], { x: 1, y: 2 }],
    [[{ x: 1, y: 2 }, 2, { x: 1, y: 2 }], { x: 1, y: 2 }],
    [[{ x: 1, y: 2 }, 3, { x: 1, y: 2 }], { x: 1, y: 2 }],
    [[{ x: 1, y: 2 }, 4, { x: 1, y: 2 }], { x: 1, y: 2 }],
    // test the full unit circle at 30 degree intervals
    [[{ x: 2, y: 3 }, 1 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + halfRoot3, y: 3.5 }],
    [[{ x: 2, y: 3 }, 2 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + 0.5, y: 3 + halfRoot3 }],
    [[{ x: 2, y: 3 }, 3 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + 0, y: 4 }],
    [[{ x: 2, y: 3 }, 4 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + -0.5, y: 3 + halfRoot3 }],
    [[{ x: 2, y: 3 }, 0 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + 1, y: 3 }],
    [[{ x: 2, y: 3 }, 5 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + -halfRoot3, y: 3.5 }],
    [[{ x: 2, y: 3 }, 6 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + -1, y: 3 }],
    [[{ x: 2, y: 3 }, 7 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + -halfRoot3, y: 2.5 }],
    [[{ x: 2, y: 3 }, 8 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + -0.5, y: 3 - halfRoot3 }],
    [[{ x: 2, y: 3 }, 9 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + 0, y: 2 }],
    [[{ x: 2, y: 3 }, 10 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + 0.5, y: 3 - halfRoot3 }],
    [[{ x: 2, y: 3 }, 11 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + halfRoot3, y: 2.5 }],
    [[{ x: 2, y: 3 }, 12 * Math.PI / 6, { x: 1, y: 3 }], { x: 1 + 1, y: 3 }],
  ])(
    "rotateAroundPoint(%p)",
    (args: [Point, number, Point], expected: Point) => {
      const result = rotateAroundPoint(...args);
      expect(result.x).toBeCloseTo(expected.x, 14);
      expect(result.y).toBeCloseTo(expected.y, 14);
    }
  )
})
