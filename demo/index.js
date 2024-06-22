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
        label: "arrows",
        pattern: "M0 0L3 3M0 0 L-3 3,10,20,T"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-125, 45],
          [-125.1, 45],
          [-125.2, 45.1],
          [-125.2, 45],
        ]
      }
    }
  ]
},
  {
    style: (feature) => ({ ...feature.properties }),
    onEachFeature: (feature, layer) => {
      layer.bindPopup(
        `<p><strong>${feature.properties.label}:</strong></p><p>${feature.properties.pattern}</p>`
      )
    }
  }
).addTo(map);