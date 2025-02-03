
const urlAPI = "api/InstructorAPI.php";
const salir = () => {
    redireccionar("../instructores");
};
function ready() {
    const id = parseInt($("#instructor").val(), 10);
    if (isNaN(id)) {
        salir();
    } else {
        crearPeticion(urlAPI, {case: "recuperarInstructor", data: "id=" + id}, (res) => {
            construirCardInstructor(res.instructor);
            construirTablaTalleres(res.talleres);
            setChart();
        });
    }
}


function construirCardInstructor(instructor) {
    if ((typeof instructor === 'object' && instructor !== null && Object.keys(instructor).length > 0) ||
            (Array.isArray(instructor) && instructor.length > 0)) {
        $('#nombre').text(instructor.nombreCompleto);
        $('#profile').attr('src', 'data:image/jpeg;base64,' + instructor.fotografia);
        const details = [
            {label: "Teléfono", value: instructor.telefono || "N/A"},
            {label: "Correo", value: instructor.correoElectronico}
        ];
        $('#instructor-details').empty();
        details.forEach(detail => {
            const listItem = $('<li>').addClass('py-2')
                    .append($('<p>').addClass('fw-normal text-dark mb-0')
                            .html(`${detail.label}: <span class="fw-light ms-1">${detail.value}</span>`));
            $('#instructor-details').append(listItem);
        });
    } else {
        salir();
    }
}

function construirTablaTalleres(talleres) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    $('#tablaTalleres tbody').empty();

    talleres.forEach(taller => {
        const fila = $('<tr>');
        fila.append($('<td>').text(taller.nombre));
        fila.append($('<td>').text(taller.tipoTaller.val));
        fila.append($('<td>').text(taller.evaluacionHabilitada ? 'Sí' : 'No'));
        if (urlRegex.test(taller.observaciones)) {
            fila.append($('<td>').html(`<a href="${taller.observaciones}" target="_blank" class="text-info">Acceder</a>`));
        } else {
            // Si no es una URL, mostrar el texto de manera truncada
            const texto = taller.observaciones.length > 100 ?
                    taller.observaciones.substring(0, 100) + '...' :
                    taller.observaciones;
            fila.append($('<td>')
                    .text(texto)
                    .attr('title', taller.observaciones)
                    .css({
                        'max-width': '200px', // Establecer un ancho máximo para la celda
                        'white-space': 'nowrap', // Evitar que el texto se divida en varias líneas
                        'overflow': 'hidden', // Ocultar el texto que se desborda
                        'text-overflow': 'ellipsis' // Añadir puntos suspensivos cuando el texto se corta
                    })
                    );
        }
        $('#tablaTalleres tbody').append(fila);
    });
}

function setChart() {
    var options_realtime = {
        series: [
            {
                data: data.slice(),
            },
        ],
        chart: {
            fontFamily: "inherit",
            id: "realtime",
            height: 350,
            type: "line",
            animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: {
                    speed: 1000,
                },
            },
            toolbar: {
                show: false,
            },

            zoom: {
                enabled: false,
            },
        },
        grid: {
            borderColor: "transparent",
        },
        colors: ["var(--bs-primary)"],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        markers: {
            size: 0,
        },
        xaxis: {
            type: "datetime",
            range: XAXISRANGE,
            labels: {
                style: {
                    colors: [
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                    ],
                },
            },
        },
        yaxis: {
            max: 100,
            labels: {
                style: {
                    colors: [
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                        "#a1aab2",
                    ],
                },
            },
        },
        tooltip: {
            theme: "dark",
        },
        legend: {
            show: false,
        },
    };

    var chart_line_realtime = new ApexCharts(
            document.querySelector("#chart-line-real-time"),
            options_realtime
            );
    chart_line_realtime.render();

    window.setInterval(function () {
        getNewSeries(lastDate, {
            min: 10,
            max: 90,
        });

        chart_line_realtime.updateSeries([
            {
                data: data,
            },
        ]);
    }, 800);
}



  var lastDate = 0;
  var data = [];
  var TICKINTERVAL = 86400000;
  let XAXISRANGE = 777600000;

  function getDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      data.push({
        x,
        y,
      });
      lastDate = baseval;
      baseval += TICKINTERVAL;
      i++;
    }
  }

  getDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 10, {
    min: 10,
    max: 90,
  });

  function getNewSeries(baseval, yrange) {
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate;

    for (var i = 0; i < data.length - 10; i++) {
      data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
      data[i].y = 0;
    }

    data.push({
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
    });
  }