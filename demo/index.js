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
        label: "fence",
        pattern: "m13 2h-11c-.26522 0-.51957.10536-.70711.29289-.18753.18754-.29289.44189-.29289.70711v6c0 .26522.10536.51957.29289.70711.18754.18753.44189.29289.70711.29289h1v2.5c0 .1326.05268.2598.14645.3536.09376.0937.22094.1464.35355.1464s.25979-.0527.35355-.1464c.09377-.0938.14645-.221.14645-.3536v-.5h7v.5c0 .1326.0527.2598.1464.3536.0938.0937.221.1464.3536.1464s.2598-.0527.3536-.1464c.0937-.0938.1464-.221.1464-.3536v-2.5h1c.2652 0 .5196-.10536.7071-.29289.1875-.18754.2929-.44189.2929-.70711v-6c0-.26522-.1054-.51957-.2929-.70711-.1875-.18753-.4419-.29289-.7071-.29289zm0 1v2l-2-2zm-3.5 0 3.5 3.5v2.5l-6-6zm-4 6-3.5-3.5v-2.5l6 6zm-3.5 0v-2l2 2zm9 2h-7v-1h7zm-.207-2h-1.293l-6-6h2l6 6z,20,20,F"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-124.8, 44.8],
          [-124.6, 44.8],
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