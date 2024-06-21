import { describe, it, expect } from "@jest/globals"
import { SvgPath, PathCommand, CommandOperator } from "../src/svg-path"
import Transform from "../src/path-transform"

describe("translate", () => {
  it.each<[[SvgPath, number], SvgPath]>([
    [[[], 0], []],
    [[
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [1.23456789, 2.3456789]
        },
        {
          isAbsolute: false,
          operator: CommandOperator.Line,
          parameters: [3.456749, 4.567851]
        },
      ],
      4
    ],
    [
      {
        isAbsolute: true,
        operator: CommandOperator.Move,
        parameters: [1.2346, 2.3457]
      },
      {
        isAbsolute: false,
        operator: CommandOperator.Line,
        parameters: [3.4567, 4.5679]
      },
    ]],
  ])(
    "round(%p)",
    (args: [SvgPath, number], expected: SvgPath) => {
      expect(Transform.round(...args)).toEqual(expected);
    }
  )
})

describe("translate", () => {
  it.each<[[SvgPath, number, number], SvgPath]>([
    // The empty path translated by any amount is the empty path
    [[[], 0, 0], []],
    [[[], -10, -10], []],
    [[[], -10, 10], []],
    [[[], 10, -10], []],
    [[[], 10, 10], []],
    // any path from any quadrant translated by 0 is the same
    [[[{ isAbsolute: true, operator: CommandOperator.Move, parameters: [-1, -2] }], 0, 0], [{ isAbsolute: true, operator: CommandOperator.Move, parameters: [-1, -2] }]],
    [[[{ isAbsolute: true, operator: CommandOperator.Move, parameters: [-1, 2] }], 0, 0], [{ isAbsolute: true, operator: CommandOperator.Move, parameters: [-1, 2] }]],
    [[[{ isAbsolute: true, operator: CommandOperator.Move, parameters: [1, -2] }], 0, 0], [{ isAbsolute: true, operator: CommandOperator.Move, parameters: [1, -2] }]],
    [[[{ isAbsolute: true, operator: CommandOperator.Move, parameters: [1, 2] }], 0, 0], [{ isAbsolute: true, operator: CommandOperator.Move, parameters: [1, 2] }]],
    // translate into each quadrant
    [[[{ isAbsolute: true, operator: CommandOperator.Move, parameters: [1, 2, 3, 4] }], -10, -10], [{ isAbsolute: true, operator: CommandOperator.Move, parameters: [-9, -8, -7, -6] }]],
    [[[{ isAbsolute: true, operator: CommandOperator.Move, parameters: [1, 2, 3, 4] }], -10, 10], [{ isAbsolute: true, operator: CommandOperator.Move, parameters: [-9, 12, -7, 14] }]],
    [[[{ isAbsolute: true, operator: CommandOperator.Move, parameters: [1, 2, 3, 4] }], 10, -10], [{ isAbsolute: true, operator: CommandOperator.Move, parameters: [11, -8, 13, -6] }]],
    [[[{ isAbsolute: true, operator: CommandOperator.Move, parameters: [1, 2, 3, 4] }], 10, 10], [{ isAbsolute: true, operator: CommandOperator.Move, parameters: [11, 12, 13, 14] }]],
    // // translate an L command
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "L", parameters: [3, 4, 5, 6] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "L", parameters: [13, 24, 15, 26] }]],
    // // translate an H command
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "H", parameters: [3, 4] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "H", parameters: [13, 14] }]],
    // // translate a V command
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "V", parameters: [3, 4] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "V", parameters: [23, 24] }]],
    // // translate a C command
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "C", parameters: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "C", parameters: [13, 24, 15, 26, 17, 28, 19, 30, 21, 32, 23, 34] }]],
    // // translate a S command
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "S", parameters: [3, 4, 5, 6, 7, 8, 9, 10] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "S", parameters: [13, 24, 15, 26, 17, 28, 19, 30] }]],
    // // translate a Q command
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "Q", parameters: [3, 4, 5, 6, 7, 8, 9, 10] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "Q", parameters: [13, 24, 15, 26, 17, 28, 19, 30] }]],
    // // translate a T command
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "T", parameters: [3, 4, 5, 6] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "T", parameters: [13, 24, 15, 26] }]],
    // // translate a A command
    // // only the last 2 of 7 parameters should be translated
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "A", parameters: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "A", parameters: [3, 4, 5, 6, 7, 18, 29, 10, 11, 12, 13, 14, 25, 36] }]],
    // // translate a Z command
    // [[[{ operator: CommandOperator.Move, parameters: [1, 2] }, { operator: "Z", parameters: [] }], 10, 20], [{ operator: CommandOperator.Move, parameters: [11, 22] }, { operator: "Z", parameters: [] }]],
    // // test that relative commands do not change
    // // TODO although, should a leading "m" change??
    // [[[{ operator: "m", parameters: [1, 2] }, { operator: "l", parameters: [3, 4] }, { operator: "h", parameters: [5] }], 10, 20], [{ operator: "m", parameters: [1, 2] }, { operator: "l", parameters: [3, 4] }, { operator: "h", parameters: [5] }]],
    // [[[{ operator: "m", parameters: [1, 2] }, { operator: "v", parameters: [3] }, { operator: "c", parameters: [4, 5, 6, 7, 8, 9] }], 10, 20], [{ operator: "m", parameters: [1, 2] }, { operator: "v", parameters: [3] }, { operator: "c", parameters: [4, 5, 6, 7, 8, 9] }]],
    // [[[{ operator: "m", parameters: [1, 2] }, { operator: "s", parameters: [3, 4, 5, 6] }, { operator: "q", parameters: [7, 8, 9, 10] }], 10, 20], [{ operator: "m", parameters: [1, 2] }, { operator: "s", parameters: [3, 4, 5, 6] }, { operator: "q", parameters: [7, 8, 9, 10] }]],
    // [[[{ operator: "m", parameters: [1, 2] }, { operator: "t", parameters: [3, 4] }, { operator: "z", parameters: [] }], 10, 20], [{ operator: "m", parameters: [1, 2] }, { operator: "t", parameters: [3, 4] }, { operator: "z", parameters: [] }]],
  ])(
    "translate(%p)",
    (args: [SvgPath, number, number], expected: SvgPath) => {
      expect(Transform.translate(...args)).toEqual(expected);
    }
  )
})