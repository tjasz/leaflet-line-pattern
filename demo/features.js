export const features = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        label: "single tick mark in the middle",
        pattern: "M-3 0 3 0,50%,,T"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-125.5, 45.3],
          [-125.3, 45.3],
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        label: "single arrow at end",
        pattern: "M0 0L7 7M0 0L-7 7,100%,,T"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-125.2, 45.3],
          [-125, 45.3],
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        label: "circle at start, arrow at end",
        pattern: "M0 0A3 3 0 0 0 0 -6A3 3 0 0 0 0 0,,105%,T;M0 0L7 7M0 0L-7 7,100%,,T"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-125.2, 45.2],
          [-125, 45.2],
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        label: "tick marks every 20% of clipped view",
        pattern: "M-4 0 4 0,,20%,T"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-125.2, 45.1],
          [-125, 45.1],
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        label: "arrows every 20px",
        pattern: "M0 0L3 5M0 0L-3 5,20,20,T"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-125.2, 45],
          [-125, 45],
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        label: "airplane every 40px",
        pattern: "M 7.5 6.8182 L 7.5 8.5 L 1 7.5 L 0.6818 12.2727 L 3.5 14 L 3.5 15 L 0 14.3182 L -3.5 15 L -3.5 14 L -0.6818 12.2727 L -1 7.5 L -7.5 8.5 L -7.5 6.8182 L -1 4.5 L -1 1.5 C -1 1.5 -1 0 0 0 S 1 1.5 1 1.5 L 1 4.3182 L 7.5 6.8182 Z,20,40,T"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-125.2, 44.9],
          [-125, 44.9],
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        label: "arrows pointing out",
        pattern: "M3 3 -3 0 3 -3,20,20,T"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-125.2, 44.8],
          [-125, 44.8],
          [-125, 44.7],
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        label: "adjoining diamonds without line",
        pattern: "M 0 0.5 L 7 7.5 L 0 14.5 L -7 7.5 L 0 0.5 z M 0 2.78 L -4.72 7.5 L 0 12.22 L 4.72 7.5 L 0 2.78 z,15,15,F"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-124.8, 44.8],
          [-124.6, 44.8],
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        label: "alternating diamonds and circles",
        pattern: "M 0 0.5 L 7 7.5 L 0 14.5 L -7 7.5 L 0 0.5 z M 0 2.78 L -4.72 7.5 L 0 12.22 L 4.72 7.5 L 0 2.78 z,14,28,F;M0 0A7 7 0 0 0 0 14A7 7 0 0 0 0 0,28,28,F"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-124.8, 44.9],
          [-124.6, 44.9],
        ]
      }
    },
  ]
}