import { describe, it, expect } from "@jest/globals"
import { moveAlongBearing, dist, rotateAroundOrigin, Point } from "../src/cartesian"

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

const halfRoot3 = Math.sqrt(3) / 2;
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

const root2 = Math.sqrt(2);
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
    "rotateAroundOrigin(%p)",
    (args: [Point, number], expected: Point) => {
      const result = rotateAroundOrigin(...args);
      expect(result.x).toBeCloseTo(expected.x, 14);
      expect(result.y).toBeCloseTo(expected.y, 14);
    }
  )
})
