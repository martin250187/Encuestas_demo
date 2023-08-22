var canvaFilter = document.getElementById("myChartFilter").getContext("2d");
var chartFilter;
var filterSelectChart = (id, establecimiento) => { 

  chartFilter ? chartFilter.destroy():"";//Si existe destroy chartFiter

  var totalF = 0;
  var mesasF = 0;
  var totalGanador = 0;
  var ganador;
  var totalesFilter = {
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

  results.features.forEach((feature) => {
    if (feature.properties.id === id) {
      totalesFilter.lista255 = feature.properties["MAS"];
      totalesFilter.lista298 = feature.properties["TODOS POR BUENOS AIRES"];
      totalesFilter.lista314 = feature.properties["PARTIDO REPUBLICANO FEDERAL"];
      totalesFilter.lista503 = feature.properties["AVANZA LIBERTAD"];
      totalesFilter.lista504 = feature.properties["FTE DE IZQ"];
      totalesFilter.lista505 = feature.properties["UNION POR TODOS"];
      totalesFilter.lista506_esJuntos = feature.properties["JUNTOS (ES JUNTOS)"];
      totalesFilter.lista506_darElPaso = feature.properties["JUNTOS (DAR EL PASO)"];
      totalesFilter.lista507 = feature.properties["FRENTE DE TODOS"];
      totalesFilter.lista508 = feature.properties["FRENTE VAMOS CON VOS"];
      totalesFilter.nulo = feature.properties["NULOS"];
      totalesFilter.enBlanco = feature.properties["BLANCO"];
      mesasF = feature.properties["cant_mesas"];
      totalF = feature.properties["total"];
      ganador = feature.properties["ganador"];
      totalGanador = feature.properties["total_ganador"];
    }
  });

  document.getElementById('establecimientosF').innerText = establecimiento;
  document.getElementById('ganadorF').innerText = 'Ganador: Lista '+ganador+' ==> '+((totalGanador/totalF)*100).toFixed(2)+' %';
  document.getElementById('votantesF').innerText = 'Votantes: '+totalF;
  document.getElementById('mesasF').innerText = 'Mesas: '+mesasF;

  chartFilter = new Chart(canvaFilter, {
    type: "bar",
    data: {
      labels: partidos,
      datasets: [
        {
          data: Object.values(totalesFilter).map((x) => ((x / totalF) * 100).toFixed(2)),
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
          text: `% ${establecimiento}`,
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
}