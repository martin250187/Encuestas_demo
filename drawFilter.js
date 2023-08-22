//AREA drawnItems EN m2==> L.GeometryUtil.geodesicArea(drawnItems.getLayers()[0].getLatLngs()[0])
//AREA intersectionLayer EN m2==> L.GeometryUtil.geodesicArea(intersectionLayer.getLayers()[0].getLatLngs()[0])

var pointsGeoJSON = resultados.toGeoJSON(); //Capa a intersectar
let intersectionLayer = new L.geoJSON();
const filterLayers = () => {
  var count = 0;
  let intersectFeatures = [];
  if (intersectionLayer.getLayers().length !== 0) {
    intersectionLayer.clearLayers();
    layersControl.removeLayer(intersectionLayer);
  }

  var drawPolygonGeoJSON = drawnItems.toGeoJSON().features[0];
  //Chequeo que feature intersecta con el dibujo
  pointsGeoJSON.features.forEach((feature) => {
    var isInside = turf.booleanPointInPolygon(
      feature.geometry.coordinates,
      drawPolygonGeoJSON
    );
    if (isInside) {
      intersectFeatures.push(feature);
      count++;
    }
  });

  if (intersectFeatures.length === 0) {
    alert("NO hay Intesecciones");
  } else {
    intersectionLayer.addData(intersectFeatures);
    intersectionLayer.addTo(map);
    layersControl.addOverlay(intersectionLayer,"Establecimientos seleccionados");
    //map.fitBounds(drawPolygonGeoJSON.getBounds());
    //console.log(count);
  }
};
