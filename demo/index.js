import SvgPatternRenderer from "../src";
import { features } from "./features";

const osmTiles = new L.TileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
);

const map = new L.Map("map", {
  layers: [osmTiles],
  center: [45, -125],
  zoom: 10,
  renderer: new SvgPatternRenderer(),
});

const geojson = new L.GeoJSON(features, {
  style: (feature) => ({ weight: 2, ...feature.properties }),
  onEachFeature: (feature, layer) => {
    layer.bindPopup(
      `<p><strong>${feature.properties.label}:</strong></p><p>${feature.properties.pattern}</p>`,
    );
  },
}).addTo(map);
