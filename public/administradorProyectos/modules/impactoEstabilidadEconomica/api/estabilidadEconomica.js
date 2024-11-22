const urlAPI = "api/ImpactoCalidaVidaAPI.php";

function ready() {

    let currentYear = new Date().getFullYear();
    let startYear = 2020;
    let endYear = currentYear;
    $('#anioInicioNarrativa').text(startYear);
    $('#anioFinalNarrativa').text(endYear);
    // Llenar los select con los años
    for (let year = startYear; year <= endYear; year++) {
        $('#añoInicio').append(new Option(year, year));
        $('#añoFinal').append(new Option(year, year));
    }


    $('#añoInicio').val(startYear);
    $('#añoFinal').val(endYear);

    // Validar que el año final no sea menor que el año de inicio
    $('#añoInicio, #añoFinal').change(function () {
        let añoInicio = parseInt($('#añoInicio').val());
        let añoFinal = parseInt($('#añoFinal').val());

        // Verificar si el año de inicio es mayor que el año final
        if (añoInicio > añoFinal) {
            alert('El año de inicio no puede ser mayor que el año final.');

            // Restaurar el valor del campo que se modificó
            if ($('#añoInicio').val() !== añoInicio) {
                $('#añoInicio').val(añoFinal);
            } else {
                $('#añoFinal').val(añoInicio);
            }
        }

        // Actualizar los valores en la narrativa
        $('#anioInicioNarrativa').text(añoInicio);
        $('#anioFinalNarrativa').text(añoFinal);

    });
}



function updateImpacto(section) {
    const obtenido = parseFloat(document.getElementById(`obtenido${section}`).innerText.replace('%', ''));
    const pesoInput = document.getElementById(`peso${section}`);
    const pesoText = document.getElementById(`peso${section}-text`);
    const impacto = document.getElementById(`impacto${section}`);

    // Obtener los valores actuales de los pesos
    const peso1 = parseFloat(document.getElementById('peso1').value);
    const peso2 = parseFloat(document.getElementById('peso2').value);
    const peso3 = parseFloat(document.getElementById('peso3').value);

    // Calcular la suma de los pesos
    let sumaPesos = peso1 + peso2 + peso3;

    // Validar que no exceda el 100%
    if (sumaPesos > 100) {
        const exceso = sumaPesos - 100;

        // Distribuir el exceso proporcionalmente entre las otras secciones
        const secciones = [1, 2, 3].filter(sec => sec !== section);
        const totalOtrosPesos = secciones.reduce((acc, sec) => acc + parseFloat(document.getElementById(`peso${sec}`).value), 0);

        secciones.forEach(sec => {
            const pesoSec = document.getElementById(`peso${sec}`);
            const nuevoPeso = parseFloat(pesoSec.value) - (exceso * (parseFloat(pesoSec.value) / totalOtrosPesos));
            pesoSec.value = nuevoPeso.toFixed(2); // Ajustar el peso
            document.getElementById(`peso${sec}-text`).innerText = `${nuevoPeso.toFixed(2)}%`;
            const obtenidoSec = parseFloat(document.getElementById(`obtenido${sec}`).innerText.replace('%', ''));
            document.getElementById(`impacto${sec}`).innerText = `${((nuevoPeso / 100) * obtenidoSec).toFixed(2)}%`;
        });

        sumaPesos = 100; // Asegurar que los pesos ahora suman 100
    }

    // Actualizar el texto del peso y la contribución al impacto
    pesoText.innerText = `${pesoInput.value}%`;
    impacto.innerText = `${((pesoInput.value / 100) * obtenido).toFixed(2)}%`;
}
