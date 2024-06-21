import { SvgPath } from "./svg-path"

/**
 * Round all the coordinates in a path to the number of places given.
 * @param path The input path
 * @param places The number of decimal places to round to
 * @returns A copy of the path with the coordinates rounded
 */
// TODO is applying the rounding to all parameters a problem for arcs?
export function round(path: SvgPath, places: number): SvgPath {
  const round = (n: number) => +n.toFixed(places);
  const result = path.map(c => {
    return { ...c, parameters: c.parameters.map(round) }
  });
  return result;
}

/**
 * Translate a given path horizontally by `dx` and vertically by `dy`.
 * @param path The input path.
 * @param dx The amount to move the path along the X axis
 * @param dy The amount to move the path along the Y axis
 * @returns A copy of the path translated by (`dx`, `dy`)
 */
export function translate(path: SvgPath, dx: number, dy: number): SvgPath {
  if (dx === 0 && dy === 0) {
    return path;
  }
  const result = path.map(c => {
    if (c.isAbsolute) {
      switch (c.operator) {
        // commands with x and y coordinates
        case "M":
        case "L":
        case "C":
        case "S":
        case "Q":
        case "T":
          return {
            ...c, parameters: c.parameters.map((v, i) => v + (i % 2 ? dy : dx))
          }
        // commands with just x coordinates
        case "H":
          return { ...c, parameters: c.parameters.map(x => x + dx) }
        // commands with just y coordinates
        case "V":
          return { ...c, parameters: c.parameters.map(y => y + dy) }
        // commands with no coordinates
        case "Z":
          return c;
        // the arc command
        case "A":
          // each arc is defined with 7 parameters where the last two are X and Y
          return {
            ...c, parameters: c.parameters.map((v, i) => v + (i % 7 === 5 ? dx : i % 7 === 6 ? dy : 0))
          }
        default:
          throw new Error("Invalid SVG command: " + c.operator)
      }
    } else {
      return c;
    }
  });
  return result;
}

const Transform = {
  round,
  translate
}
export default Transform;