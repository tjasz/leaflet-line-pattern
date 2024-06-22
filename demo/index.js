import SvgPatternRenderer from "../src";

const osmTiles = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
})

const map = new L.Map("map", {
  layers: [osmTiles],
  center: [45, -125],
  zoom: 10,
  renderer: new SvgPatternRenderer(),
})

const features = new L.GeoJSON({
  type: "FeatureCollection",
  features: [
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
        label: "airplane every 40px (starting at 20px offset)",
        pattern: "M15 6.8182L15 8.5l-6.5 -1 l-0.3182 4.7727L11 14v1l-3.5 -0.6818L4 15v-1l2.8182 -1.7273L6.5 7.5L0 8.5V6.8182L6.5 4.5v-3c0 0 0 -1.5 1 -1.5s1 1.5 1 1.5v2.8182 L15 6.8182z,20,40,F"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-125.2, 44.9],
          [-125, 44.9],
        ]
      }
    },
  ]
},
  {
    style: (feature) => ({ weight: 1, ...feature.properties }),
    onEachFeature: (feature, layer) => {
      layer.bindPopup(
        `<p><strong>${feature.properties.label}:</strong></p><p>${feature.properties.pattern}</p>`
      )
    }
  }
).addTo(map);