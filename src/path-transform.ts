import { SvgPath } from "./svg-path"

export function round(p: SvgPath, places: number): SvgPath {
  const round = (n: number) => +n.toFixed(places);
  const result = p.map(c => {
    return { ...c, parameters: c.parameters.map(round) }
  });
  return result;
}

const Transform = {
  round
}
export default Transform;