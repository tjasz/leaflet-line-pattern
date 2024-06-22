const osmTiles = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
})

const map = new L.Map("map", {
  layers: [osmTiles],
  center: [47.5, -122.3],
  zoom: 10,
})