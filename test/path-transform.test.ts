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