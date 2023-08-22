var canvaFilterDraw = document
  .getElementById("myChartFilterDraw")
  .getContext("2d");
var chartFilterDraw;
var intersect;

let estiloFiltro = function (feature) {
  return L.circleMarker(latlng, {
    radius: 10,
    color: "black",
    fillColor: "red",
    fillOpacity: 1,
    weight: 1,
  });
};

var filterDrawChart = () => {
  chartFilterDraw ? chartFilterDraw.destroy() : ""; //Si existe destroy chartFiterDraw

  var totalFD = 0;
  var mesasFD = 0;
  var totalGanadorFD = 0;
  var ganadorFD = '';
  var count = 0;
  var totalesFilterDraw = {
    lista255: 0,
    lista298: 0,
    lista314: 0,
    lista503: 0,
    lista504: 0,
    lista505: 0,
    lista506_esJuntos: 0,
    lista506_darElPaso: 0,
    lista507: 0,
    lista508: 0,
    nulo: 0,
    enBlanco: 0,
  };
  intersect = intersectionLayer.toGeoJSON();
  intersect.features.forEach((feature) => {
    totalesFilterDraw.lista255 += feature.properties["MAS"];
    totalesFilterDraw.lista298 += feature.properties["TODOS POR BUENOS AIRES"];
    totalesFilterDraw.lista314 +=
      feature.properties["PARTIDO REPUBLICANO FEDERAL"];
    totalesFilterDraw.lista503 += feature.properties["AVANZA LIBERTAD"];
    totalesFilterDraw.lista504 += feature.properties["FTE DE IZQ"];
    totalesFilterDraw.lista505 += feature.properties["UNION POR TODOS"];
    totalesFilterDraw.lista506_esJuntos +=
      feature.properties["JUNTOS (ES JUNTOS)"];
    totalesFilterDraw.lista506_darElPaso +=
      feature.properties["JUNTOS (DAR EL PASO)"];
    totalesFilterDraw.lista507 += feature.properties["FRENTE DE TODOS"];
    totalesFilterDraw.lista508 += feature.properties["FRENTE VAMOS CON VOS"];
    totalesFilterDraw.nulo += feature.properties["NULOS"];
    totalesFilterDraw.enBlanco += feature.properties["BLANCO"];
    mesasFD += feature.properties["cant_mesas"];
    totalFD += feature.properties["total"];
    count++;
  });
  if (totalesFilterDraw.lista506_esJuntos > totalesFilterDraw.lista507){
    totalGanadorFD = ((totalesFilterDraw.lista506_esJuntos/totalFD)* 100).toFixed(2);
    ganadorFD = "Lista 506, JUNTOS (ES JUNTOS)"
  }
    else{
      totalGanadorFD = ((totalesFilterDraw.lista507/totalFD)* 100).toFixed(2);
      ganadorFD = "Lista 507, FRENTE DE TODOS"
    }
  document.getElementById('establecimientosFD').innerText = 'Establecimientos seleccionados: ' + count;
  document.getElementById('ganadorFD').innerText = 'Ganador: ' + ganadorFD + ' ==> ' + totalGanadorFD +' %';
  document.getElementById("votantesFD").innerText = "Votantes: " + totalFD;
  document.getElementById("mesasFD").innerText = "Mesas: " + mesasFD;

  chartFilterDraw = new Chart(canvaFilterDraw, {
    type: "bar",
    data: {
      labels: partidos,
      datasets: [
        {
          data: Object.values(totalesFilterDraw).map((x) =>
            ((x / totalFD) * 100).toFixed(2)
          ),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: `% RESULTADOS GENERALES PASO 2021 (${count} seleccionados)`,
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
};
