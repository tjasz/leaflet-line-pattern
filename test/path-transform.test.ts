import { describe, it, expect } from "@jest/globals";
import { SvgPath, PathCommand, CommandOperator } from "../src/svg-path";
import Transform from "../src/path-transform";

describe("round", () => {
  it.each<[[SvgPath, number], SvgPath]>([
    [[[], 0], []],
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1.23456789, 2.3456789],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.Line,
            parameters: [3.456749, 4.567851],
          },
        ],
        4,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [1.2346, 2.3457],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.Line,
          parameters: [3.4567, 4.5679],
        },
      ],
    ],
  ])("round(%p)", (args: [SvgPath, number], expected: SvgPath) => {
    expect(Transform.round(...args)).toEqual(expected);
  });
});

describe("translate", () => {
  it.each<[[SvgPath, number, number], SvgPath]>([
    // The empty path translated by any amount is the empty path
    [[[], 0, 0], []],
    [[[], -10, -10], []],
    [[[], -10, 10], []],
    [[[], 10, -10], []],
    [[[], 10, 10], []],
    // any path from any quadrant translated by 0 is the same
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [-1, -2],
          },
        ],
        0,
        0,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [-1, -2],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [-1, 2],
          },
        ],
        0,
        0,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [-1, 2],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, -2],
          },
        ],
        0,
        0,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [1, -2],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
        ],
        0,
        0,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [1, 2],
        },
      ],
    ],
    // translate into each quadrant
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2, 3, 4],
          },
        ],
        -10,
        -10,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [-9, -8, -7, -6],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2, 3, 4],
          },
        ],
        -10,
        10,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [-9, 12, -7, 14],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2, 3, 4],
          },
        ],
        10,
        -10,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, -8, 13, -6],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2, 3, 4],
          },
        ],
        10,
        10,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 12, 13, 14],
        },
      ],
    ],
    // when the first command is a relative move followed by impicit relative lines, only the first two paramters are translated
    [
      [
        [
          {
            isAbsolute: false,
            operator: CommandOperator.Move,
            parameters: [1, 2, 3, 4],
          },
        ],
        10,
        10,
      ],
      [
        {
          isAbsolute: false,
          operator: CommandOperator.Move,
          parameters: [11, 12, 3, 4],
        },
      ],
    ],
    // translate an L command
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: true,
            operator: CommandOperator.Line,
            parameters: [3, 4, 5, 6],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: true,
          operator: CommandOperator.Line,
          parameters: [13, 24, 15, 26],
        },
      ],
    ],
    // translate an H command
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: true,
            operator: CommandOperator.Horizontal,
            parameters: [3, 4],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: true,
          operator: CommandOperator.Horizontal,
          parameters: [13, 14],
        },
      ],
    ],
    // translate a V command
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: true,
            operator: CommandOperator.Vertical,
            parameters: [3, 4],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: true,
          operator: CommandOperator.Vertical,
          parameters: [23, 24],
        },
      ],
    ],
    // translate a C command
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: true,
            operator: CommandOperator.Cubic,
            parameters: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: true,
          operator: CommandOperator.Cubic,
          parameters: [13, 24, 15, 26, 17, 28, 19, 30, 21, 32, 23, 34],
        },
      ],
    ],
    // translate a S command
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: true,
            operator: CommandOperator.SmoothCubic,
            parameters: [3, 4, 5, 6, 7, 8, 9, 10],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: true,
          operator: CommandOperator.SmoothCubic,
          parameters: [13, 24, 15, 26, 17, 28, 19, 30],
        },
      ],
    ],
    // translate a Q command
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: true,
            operator: CommandOperator.Quadratic,
            parameters: [3, 4, 5, 6, 7, 8, 9, 10],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: true,
          operator: CommandOperator.Quadratic,
          parameters: [13, 24, 15, 26, 17, 28, 19, 30],
        },
      ],
    ],
    // translate a T command
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: true,
            operator: CommandOperator.SmoothQuadratic,
            parameters: [3, 4, 5, 6],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: true,
          operator: CommandOperator.SmoothQuadratic,
          parameters: [13, 24, 15, 26],
        },
      ],
    ],
    // translate a A command
    // only the last 2 of 7 parameters should be translated
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: true,
            operator: CommandOperator.Arc,
            parameters: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: true,
          operator: CommandOperator.Arc,
          parameters: [3, 4, 5, 6, 7, 18, 29, 10, 11, 12, 13, 14, 25, 36],
        },
      ],
    ],
    // translate a Z command
    [
      [
        [
          {
            isAbsolute: true,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          { isAbsolute: true, operator: CommandOperator.Close, parameters: [] },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: true,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        { isAbsolute: true, operator: CommandOperator.Close, parameters: [] },
      ],
    ],
    // // test that relative commands other than CommandOperator.Move do not change
    [
      [
        [
          {
            isAbsolute: false,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.Line,
            parameters: [3, 4],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.Horizontal,
            parameters: [5],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: false,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.Line,
          parameters: [3, 4],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.Horizontal,
          parameters: [5],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: false,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.Vertical,
            parameters: [3],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.Cubic,
            parameters: [4, 5, 6, 7, 8, 9],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: false,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.Vertical,
          parameters: [3],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.Cubic,
          parameters: [4, 5, 6, 7, 8, 9],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: false,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.SmoothCubic,
            parameters: [3, 4, 5, 6],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.Quadratic,
            parameters: [7, 8, 9, 10],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: false,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.SmoothCubic,
          parameters: [3, 4, 5, 6],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.Quadratic,
          parameters: [7, 8, 9, 10],
        },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: false,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.SmoothQuadratic,
            parameters: [3, 4],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.Close,
            parameters: [],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: false,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.SmoothQuadratic,
          parameters: [3, 4],
        },
        { isAbsolute: false, operator: CommandOperator.Close, parameters: [] },
      ],
    ],
    [
      [
        [
          {
            isAbsolute: false,
            operator: CommandOperator.Move,
            parameters: [1, 2],
          },
          {
            isAbsolute: false,
            operator: CommandOperator.Arc,
            parameters: [3, 4, 5, 0, 0, 6, 7],
          },
        ],
        10,
        20,
      ],
      [
        {
          isAbsolute: false,
          operator: CommandOperator.Move,
          parameters: [11, 22],
        },
        {
          isAbsolute: false,
          operator: CommandOperator.Arc,
          parameters: [3, 4, 5, 0, 0, 6, 7],
        },
      ],
    ],
  ])("translate(%p)", (args: [SvgPath, number, number], expected: SvgPath) => {
    expect(Transform.translate(...args)).toEqual(expected);
  });
});
