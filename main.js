var totalDisplay = document.querySelector(".total");
var filterSelectDisplay = document.querySelector(".filterSelect");
var filterDrawDisplay = document.querySelector(".filterDraw");

//MAP
var map = L.map("map", {
  center: [-36.893768185199576, -60.323053082886105],
  zoom: 14,
  maxZoom: 17,
  minZoom: 8,
  zoomControl: false,
});

//BASE MAP
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
});
var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {}
).addTo(map);

//ZOOM CONTROL
var zoomControl = L.control.zoom({ position: "topleft" }).addTo(map);

//ESCALA
L.control.scale({ position: "bottomleft" }).addTo(map);

//STYLE
function resultStyle(feature, latlng) {
  if (feature.properties.ganador === "506, JUNTOS (ES JUNTOS)") {
    return L.circleMarker(latlng, {
      radius: 7,
      color: "black",
      fillColor: "#EACE1F",
      fillOpacity: 1,
      weight: 1,
    });
  } else if (feature.properties.ganador === "507, FRENTE DE TODOS") {
    return L.circleMarker(latlng, {
      radius: 7,
      color: "black",
      fillColor: "white",
      fillOpacity: 1,
      weight: 1,
    });
  }
}

//GEOJSON
var resultados = L.geoJSON(results, {
  pointToLayer: resultStyle,
  onEachFeature: (feature, layer) => {
    layer.on({
      contextmenu: () => {
        //POPUP
        layer.bindPopup(
          '<span class="titlePopup">GANADOR: ' +
            feature.properties.ganador +
            "<span>" +
            "<hr>" +
            '<div>JUNTOS (ES JUNTOS) ==> ' +
            feature.properties[`JUNTOS (ES JUNTOS)`] +
            " VOTOS<div>" +
            "<hr>" +
            '<div>FRENTE DE TODOS ==> ' +
            feature.properties[`FRENTE DE TODOS`] +
            " VOTOS<div>" +
            "<hr>" +
            '<div>VOTANTES TOTALES: ' +
            feature.properties.total +
            "<div>"
        );
      },
      click: () => {
        if (drawnItems) {
          drawnItems.clearLayers();
          intersectionLayer.clearLayers();
          layersControl.removeLayer(intersectionLayer);
        }

        //alert(feature.properties.id+' '+feature.properties.ganador)
        filterSelectChart(
          feature.properties.id,
          feature.properties.establecimiento
        );
        map.flyTo([
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ]);
        totalDisplay.style.display = "none";
        filterDrawDisplay.style.display = "none";
        filterSelectDisplay.style.display = "block";
      },
    });
  },
}).addTo(map);

//LAYER CONTROL
var baseLayers = {
  OpenStreetMap: osm,
  "Imágen Satelital": Esri_WorldImagery,
};
var overlayers = {
  Establecimientos: resultados,
};

var layersControl = L.control.layers(baseLayers, overlayers, {
  collapsed: true,
  position: "topright",
});
layersControl.addTo(map);

//MARCA DE AGUA
var img = L.DomUtil.create("img");
L.Control.Watermark = L.Control.extend({
  onAdd: function (map) {
    img.src = "./assets/img/gobierno digital logo-sinfondo.png";
    img.style.width = "120px";
    img.style.opacity = "70%";

    return img;
  },

  onRemove: function (map) {
    // Nothing to do here
  },
});

L.control.watermark = function (opts) {
  return new L.Control.Watermark(opts);
};

L.control
  .attribution({
    prefix:
      '<span style="font-size: smaller;"></span><a href="https://mapgeogis.com" rel="author" target="_blank" style="font-size: smaller;">MapGeoGIS</a>',
    position: "bottomright",
  })//.addTo(map);
L.control.watermark({ position: "bottomright" }); //.addTo(map);

//LEYENDA..
var legend = L.control
  .Legend({
    title: "Referencias",
    position: "bottomright",
    collapsed: false,
    legends: [
      {
        label: "Lista 506, JUNTOS (ES JUNTOS)",
        type: "circle",
        fillColor: "#EACE1F",
        color: "#373737",
      },
      {
        label: "Lista 507, FRENTE DE TODOS",
        type: "circle",
        fillColor: "white",
        color: "#373737",
      },
    ],
  }).addTo(map);

//BUTTON
L.easyButton("fa fa-refresh", function () {
  totalDisplay.style.display = "block";
  filterDrawDisplay.style.display = "none";
  filterSelectDisplay.style.display = "none";

  if (drawnItems) {
    drawnItems.clearLayers();
    intersectionLayer.clearLayers();
    layersControl.removeLayer(intersectionLayer);
  }
}).addTo(map);

//DRAW TOOLS
var drawnItems = L.featureGroup().addTo(map);
var drawControl = new L.Control.Draw({
  edit: false,
  draw: {
    polygon: {
      allowIntersection: false,
      showArea: true,
    },
    marker: false,
    polyline: false,
    rectangle: true,
    circle: false,
    circlemarker: false,
  },
  position: "topright",
}).addTo(map);

map.on(L.Draw.Event.CREATED, function (event) {
  drawnItems.clearLayers();
  var layer = event.layer;
  if (drawnItems.getLayers().length === 0) {
    drawnItems.addLayer(layer);
    filterLayers();
    filterDrawChart();
    totalDisplay.style.display = "none";
    filterDrawDisplay.style.display = "block";
    filterSelectDisplay.style.display = "none";
    //drawnItems.remove(map);
  } else {
    map;
  }
});
