# leaflet-line-pattern

leaflet-line-pattern is a leaflet plugin that enables more options for how a line should be drawn, such as adding arrowheads or tick marks.

## Pattern

The basis of leaflet-line-pattern is the pattern definition.
A pattern is a repeated image that is rendered along the path of a LineString or Polygon.
A pattern can be one or multiple parts.
A pattern part consists of the following
- An SVG path
- An offset after which to start repeating the pattern
- The interval defining how often to repeat the pattern
- A boolean flag indicating whether to draw the underlying line or just follow it

### Examples

## Getting Started

### Install
`npm i leaflet-line-pattern`

### Import
`import SvgPatternRenderer from "leaflet-line-pattern";`

### Using the renderer

Simply pass the renderer as an option to your Leaflet map.

```
const map = new L.Map("map", {
  renderer: new SvgPatternRenderer(),
})
```

Then, include the "pattern" option in your layer style.

```
{
  color: "red",
  weight: 1,
  pattern: "M0 0L3 5M0 0L-3 5,20,20,T",
}
```

### Pattern definitions

## Contributing
