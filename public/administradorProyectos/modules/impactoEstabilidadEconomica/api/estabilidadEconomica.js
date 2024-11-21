const urlAPI = "api/ImpactoCalidaVidaAPI.php";

function ready() {

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
