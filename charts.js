const chart = document.getElementById("myChart");
const partidos = [
  "MAS",
  "TODOS POR BUENOS AIRES",
  "PARTIDO REPUBLICANO FEDERAL",
  "AVANZA LIBERTAD",
  "FTE DE IZQ",
  "UNION POR TODOS",
  "JUNTOS (ES JUNTOS)",
  "JUNTOS (DAR EL PASO)",
  "FRENTE DE TODOS",
  "FRENTE VAMOS CON VOS",
  "NULOS",
  "BLANCO",
];
var total = 0;
var mesas = 0;
var establecimientos = 0;
var totales = {
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
  totales.lista255 += feature.properties["MAS"];
  totales.lista298 += feature.properties["TODOS POR BUENOS AIRES"];
  totales.lista314 += feature.properties["PARTIDO REPUBLICANO FEDERAL"];
  totales.lista503 += feature.properties["AVANZA LIBERTAD"];
  totales.lista504 += feature.properties["FTE DE IZQ"];
  totales.lista505 += feature.properties["UNION POR TODOS"];
  totales.lista506_esJuntos += feature.properties["JUNTOS (ES JUNTOS)"];
  totales.lista506_darElPaso += feature.properties["JUNTOS (DAR EL PASO)"];
  totales.lista507 += feature.properties["FRENTE DE TODOS"];
  totales.lista508 += feature.properties["FRENTE VAMOS CON VOS"];
  totales.nulo += feature.properties["NULOS"];
  totales.enBlanco += feature.properties["BLANCO"];
  total += feature.properties["total"];
  mesas += feature.properties["cant_mesas"];
  establecimientos += 1;
});

document.getElementById('establecimientos').innerText += ' '+establecimientos;
document.getElementById('votantes').innerText += ' '+total;
document.getElementById('mesas').innerText += ' '+mesas;

new Chart(chart, {
  type: "bar",
  data: {
    labels: partidos,
    datasets: [
      {
        data: Object.values(totales).map((x) => ((x / total) * 100).toFixed(2)),
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
        text: "% RESULTADOS GENERALES PASO 2021",
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
