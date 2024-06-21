import { Point } from "./cartesian"

enum CommandOperator {
  Move,
  Line,
  Horizontal,
  Vertical,
  Cubic,
  SmoothCubic,
  Quadratic,
  TSmoothQuadratic,
  Arc,
  ZClose,
}

type PathCommandBase = {
  isAbsolute: boolean;
}

type MoveCommand = PathCommandBase & {
  operator: CommandOperator.Move;
  parameters: Point[];
}

type LineCommand = PathCommandBase & {
  operator: CommandOperator.Line;
  parameters: Point[];
}

type HorizontalCommand = PathCommandBase & {
  operator: CommandOperator.Horizontal;
  parameters: number[];
}

type VerticalCommand = PathCommandBase & {
  operator: CommandOperator.Vertical;
  parameters: number[];
}

type CubicCommand = PathCommandBase & {
  operator: CommandOperator.Cubic;
  parameters: [Point, Point, Point][];
}

type SmoothCubicCommand = PathCommandBase & {
  operator: CommandOperator.SmoothCubic;
  parameters: [Point, Point][];
}

type QuadraticCommand = PathCommandBase & {
  operator: CommandOperator.Quadratic;
  parameters: [Point, Point][];
}

type SmoothQuadraticCommand = PathCommandBase & {
  operator: CommandOperator.TSmoothQuadratic;
  parameters: Point[];
}

type ArcCommand = PathCommandBase & {
  operator: CommandOperator.Arc;
  parameters: [Point, number, boolean, boolean, Point][];
}

type CloseCommand = PathCommandBase & {
  operator: CommandOperator.ZClose;
}

type PathCommand =
  MoveCommand
  | LineCommand
  | HorizontalCommand
  | VerticalCommand
  | CubicCommand
  | SmoothCubicCommand
  | QuadraticCommand
  | SmoothQuadraticCommand
  | ArcCommand
  | CloseCommand;

type SvgPath = PathCommand[];

const defaultCommand: PathCommand = {
  isAbsolute: true,
  operator: CommandOperator.Move,
  parameters: [{ x: 0, y: 0 }]
};

function toString(path: SvgPath): string {
  let str = "";

  for (const c of path) {
    str += (c.isAbsolute ? c.operator.toString() : c.operator.toString().toLowerCase()).charAt(0);
    str += c.parameters.join(" ");
  }

  return str.trim();
}

function parse(path: string): SvgPath {
  if (!path || !path.length) {
    return [defaultCommand];
  }

  // Only numeric characters (0-9, period, and the negative operator),
  // command names (MLHVCSQTAZ and lowercase equivalents)
  // whitespace, and commas are allowed.
  const invalidCharacters = path.match(/[^\\sMmLlHhVvCcSsQqTtAaZz0-9,.-]/);
  if (invalidCharacters?.length) {
    throw new Error(`Invalid SVG contains non-allowed characters '${invalidCharacters.join("")}': ${path}`)
  }

  const commandStrings = path.trim().split(/(?=[MmLlHhVvCcSsQqTtAaZz])/);
  const commands = commandStrings.map(parseCommand);
  return commands;
}

function parseCommand(command: string): PathCommand {
  const commandName = command.charAt(0);
  const isAbsolute = "MLHVCSQTAZ".includes(commandName);
  const parametersString = command.slice(1).trim();
  const parameters = parametersString.length ? parametersString.split(/[, ]+/).map(v => {
    const n = Number(v);
    if (isNaN(n)) {
      throw new Error("SVG path command parameter was not a number: " + v)
    }
    return n;
  }) : [];

  switch (commandName.toUpperCase()) {
    case "M":
      return {
        isAbsolute,
        operator: CommandOperator.Move,
        parameters: toPointsList(parameters),
      }
    case "L":
      return {
        isAbsolute,
        operator: CommandOperator.Line,
        parameters: toPointsList(parameters),
      }
    case "H":
      return {
        isAbsolute,
        operator: CommandOperator.Horizontal,
        parameters,
      }
    case "V":
      return {
        isAbsolute,
        operator: CommandOperator.Vertical,
        parameters
      }
    case "C":
      return {
        isAbsolute,
        operator: CommandOperator.Cubic,
        parameters: toPointTriplesList(parameters),
      }
    case "S":
      return {
        isAbsolute,
        operator: CommandOperator.SmoothCubic,
        parameters: toPointPairsList(parameters),
      }
    case "Q":
      return {
        isAbsolute,
        operator: CommandOperator.Quadratic,
        parameters: toPointPairsList(parameters),
      }
    case "T":
      return {
        isAbsolute,
        operator: CommandOperator.TSmoothQuadratic,
        parameters: toPointsList(parameters),
      }
    case "A":
      return {
        isAbsolute,
        operator: CommandOperator.Arc,
        parameters: toArcParametersList(parameters),
      }
    case "Z":
      return {
        isAbsolute,
        operator: CommandOperator.ZClose,
      }
    default:
      throw new Error(`Invalid SVG path command: ${commandName}`);
  }
}

function toPointsList(values: number[]): Point[] {
  if (values.length % 2 !== 0) {
    throw new Error(`Invalid SVG points list had odd number of values: [${values.join(", ")}]`)
  }
  const points: Point[] = [];
  for (let i = 1; i < values.length; i += 2) {
    points.push({ x: values[i - 1], y: values[i] })
  }
  return points;
}

function toPointPairsList(values: number[]): [Point, Point][] {
  if (values.length % 4 !== 0) {
    throw new Error(`Invalid SVG command. Expected multiple of 4 values. Got: [${values.join(", ")}]`)
  }
  const points: [Point, Point][] = [];
  for (let i = 3; i < values.length; i += 4) {
    points.push([
      { x: values[i - 3], y: values[i - 2] },
      { x: values[i - 1], y: values[i] }
    ])
  }
  return points;
}

function toPointTriplesList(values: number[]): [Point, Point, Point][] {
  if (values.length % 6 !== 0) {
    throw new Error(`Invalid SVG command. Expected multiple of 6 values. Got: [${values.join(", ")}]`)
  }
  const points: [Point, Point, Point][] = [];
  for (let i = 5; i < values.length; i += 6) {
    points.push([
      { x: values[i - 5], y: values[i - 4] },
      { x: values[i - 3], y: values[i - 2] },
      { x: values[i - 1], y: values[i] }
    ])
  }
  return points;
}

function toArcParametersList(values: number[]): [Point, number, boolean, boolean, Point][] {
  if (values.length % 7 !== 0) {
    throw new Error(`Invalid SVG command. Expected multiple of 7 values. Got: [${values.join(", ")}]`)
  }
  const parameters: [Point, number, boolean, boolean, Point][] = [];
  for (let i = 6; i < values.length; i += 7) {
    parameters.push([
      { x: values[i - 6], y: values[i - 5] },
      values[i - 4],
      values[i - 3] !== 0,
      values[i - 2] !== 0,
      { x: values[i - 1], y: values[i] }
    ])
  }
  return parameters;
}