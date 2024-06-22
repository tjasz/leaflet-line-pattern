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
}).addTo(map);