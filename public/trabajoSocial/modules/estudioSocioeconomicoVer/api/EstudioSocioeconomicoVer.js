
const urlAPI = "api/ESAPI.php";

function ready() {
    crearPeticion(urlAPI, { case: "consultarEstudioSocioeconomico" }, function (data) {
        const estudio = data.estudioSocioeconomico;
        crearSeccionResumen(data);
        crearSeccionEmpleabilidad(estudio.empleabilidad);
        crearSeccionFamiliares(estudio.familiares);
        crearSeccionEconomia(estudio.economia);
        crearSeccionVivienda(estudio.vivienda);
        crearSeccionOtrosBienes(estudio.otrosBienes);
        crearSeccionReferencias(estudio.referencias);
        crearSeccionVulnerabilidades(estudio.vulnerabilidades);
    });
}

function crearSeccionResumen(data) {
    const emprendedor = data.emprendedor;
    const es = data.estudioSocioeconomico.conclusiones;
    print(es);
    $("#emprendedorProfilePicture").prop("src", "data:image/jpeg;base64," + emprendedor.fotografia);
    $("#emprendedorNombre").text(emprendedor.nombre + " " + emprendedor.apellidos);
    $("#resultadoVisita").text(data.estudioSocioeconomico.resultadoVisita);
    $("#observaciones").text(es.observaciones);
    const crearListaActitudes = (actitudes, tipo) => {
        let listaActitudesHTML = '';
        let colorClass = tipo === 'positiva' ? 'text-success' : 'text-danger';
        let iconClass = tipo === 'positiva' ? 'ti-check' : 'ti-exclamation-circle';
        actitudes.forEach(actitud => {
            listaActitudesHTML += `
            <li class="list-group-item d-flex align-items-center">
                <i class="ti ${iconClass} fs-4 me-2 ${colorClass}"></i>
                ${actitud.value}
            </li>
        `;
        });
        $("#actitudes").append(listaActitudesHTML);
    };
    if (es.actitudesPositivas) {
        crearListaActitudes(es.actitudesPositivas, 'positiva');
    }
    if (es.actitudesNegativas) {
        crearListaActitudes(es.actitudesNegativas, 'negativa');
    }
    const crearCarousel = (fotografias) => {
        // Limpiar el carrusel y el contenedor del botón antes de agregar nuevos elementos
        $("#items").empty();
        $("#carouselEditBtnContainer").remove();

        fotografias.forEach((fotoObj, idx) => {
            const img = `
                    <div class="carousel-item ${idx === 0 ? "active" : ""}" data-foto-id="${fotoObj.id}">
                        <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
                            <img src="data:image/jpeg;base64,${fotoObj.fotografia}" 
                                 class="img-fluid rounded shadow" 
                                 style="max-height: 100%; max-width: 100%; object-fit: contain;"
                                 alt="Fotografía ${fotoObj.id}">
                        </div>
                    </div>
                `;
            $("#items").append(img);
        });

        // Agregar el contenedor del botón justo después del carrusel
        $("#items").parent().after(`
                <div id="carouselEditBtnContainer" class="text-center mt-3">
                    <button id="btnEditarFoto" class="btn btn-warning">
                        <i class="ti ti-edit"></i> Cambiar fotografía
                    </button>
                </div>
            `);

        // Función para obtener el id de la foto activa
        function getFotoIdActual() {
            return $(".carousel-item.active").data("foto-id");
        }

        // Evento para actualizar el id de la foto al cambiar de slide
        $('#carouselExample').on('slid.bs.carousel', function () {
            const idFotoActual = getFotoIdActual();
            $("#btnEditarFoto").data("foto-id", idFotoActual);
        });

        // Inicializar el id en el botón al cargar
        $("#btnEditarFoto").data("foto-id", getFotoIdActual());

        // Evento click para editar la foto actual
        $("#btnEditarFoto").off("click").on("click", function () {
            const idFoto = $(this).data("foto-id");
            // Crear input file oculto si no existe
            let $inputFile = $("#inputFotoCambio");
            if ($inputFile.length === 0) {
                $inputFile = $('<input type="file" id="inputFotoCambio" accept=".jpg,.jpeg,.png" style="display:none">');
                $("body").append($inputFile);
            }
            $inputFile.val("");
            $inputFile.off("change").on("change", function (e) {
                const file = e.target.files[0];
                if (!file) return;
                const validTypes = ["image/jpeg", "image/png"];
                if (!validTypes.includes(file.type)) {
                    alert("Por favor selecciona una imagen JPG o PNG.");
                    return;
                }
                const reader = new FileReader();
                reader.onload = function (evt) {
                    crearPeticion(urlAPI, {
                        case: "cambiarFotografia",
                        data: $.param({
                            idFoto: idFoto,
                            fotografia: evt.target.result.split(',')[1] // Obtener solo la parte base64
                        })
                    }, function (response) {
                        if (response.es_valor_error === true) {
                            mostrarMensajeError(response.mensaje, false);
                        } else {
                            mostrarMensajeOk("Fotografía cambiada correctamente.", false);
                            $(`.carousel-item[data-foto-id="${idFoto}"] img`).attr("src", evt.target.result);
                        }
                    });
                };
                reader.readAsDataURL(file);
            });
            $inputFile.click();
        });

    };
    crearCarousel(es.fotografias);
}

function crearSeccionEmpleabilidad(empleabilidad) {
    const {
        empleoActualEmpresa,
        empleoActualPuesto,
        empleoActualAntiguedad,
        empleoAnteriorEmpresa,
        empleoAnteriorPuesto,
        empleoAnteriorAntiguedad,
        empleoAnteriorMotivoRetiro,
        cuentaConSeguroSocial
    } = empleabilidad;

    const empleoActualHTML = `
        <div class="col-lg-9">
            <div class="card border shadow-none">
                <div class="card-body p-4">
                    <h4 class="card-title">Empleo actual</h4>
                    <p class="card-subtitle mb-4">
                        <strong>Empresa:</strong> ${empleoActualEmpresa} <br>
                        <strong>Puesto:</strong> ${empleoActualPuesto} <br>
                        <strong>Antigüedad:</strong> ${empleoActualAntiguedad} años
                    </p>
                </div>
            </div>
        </div>`;

    const empleoAnteriorHTML = `
        <div class="col-lg-9">
            <div class="card border shadow-none">
                <div class="card-body p-4">
                    <h4 class="card-title">Empleo anterior</h4>
                    <p class="card-subtitle mb-4">
                        <strong>Empresa:</strong> ${empleoAnteriorEmpresa} <br>
                        <strong>Puesto:</strong> ${empleoAnteriorPuesto} <br>
                        <strong>Antigüedad:</strong> ${empleoAnteriorAntiguedad} años <br>
                        ${empleoAnteriorMotivoRetiro ? `<strong>Motivo de retiro:</strong> ${empleoAnteriorMotivoRetiro}` : ""}
                    </p>
                </div>
            </div>
        </div>`;


    const seguroSocialHTML = `
    <div class="col-lg-9">
        <div class="card border shadow-none">
            <div class="card-body p-4">
                <h4 class="card-title">Servicios de Seguridad Social</h4>
                <p class="card-subtitle">
                    ${cuentaConSeguroSocial ? 'Sí ' : 'No'} cuenta con seguridad social.
                </p>
            </div>
        </div>
    </div>`;

    $('#empleabilidadContainer').html(`
        <div class="row justify-content-center">
            ${empleoActualHTML}
            ${empleoAnteriorHTML}
            ${seguroSocialHTML}
        </div>
    `);
}


function crearSeccionFamiliares(familiares) {
    familiares.forEach(function (familiar) {
        const color = getRandomBoostrapColor();
        const id = familiar.idFamiliar;

        const iconItem = (icon, label, value) => `
        <div class="mb-2">
            <div class="d-flex align-items-center">
                <i class="ti ti-${icon} text-${color} me-2 fs-5"></i>
                <span class="fw-semibold text-${color} me-1">${label}:</span>
                <span class="text-dark fw-medium">${value}</span>
            </div>
        </div>`;

        const cardHTML = `
        <div class="col-md-6" id="familiar-wrapper-${id}"> <!-- NUEVA COLUMNA -->
            <div class="card-familiar card rounded-3 card-hover border border-${color}">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center mb-3">
                        <i class="ti ti-user text-${color} display-6 me-3"></i>
                        <div>
                            <h5 class="mb-0 text-dark">${familiar.nombre}</h5>
                            <small class="text-muted">${familiar.edad} años | ${familiar.parentesco}</small>
                        </div>
                    </div>
                    ${iconItem('heart', 'Estado Civil', familiar.estadoCivil.value)}
                    ${iconItem('book', 'Escolaridad', familiar.escolaridad.value)}
                    ${iconItem('briefcase', 'Ocupación', familiar.ocupacion.value)}
                    ${iconItem('currency-dollar', 'Ingreso Fijo', familiar.ingresoMensualFijo)}
                    ${iconItem('currency-dollar', 'Ingreso Variable', familiar.ingresoMensualVariable)}
                </div>
            </div>
        </div>`;
        $("#familiaresContainer").append(cardHTML);
    });
}


function crearSeccionEconomia(economia) {

    const $contenedorEconomia = $('#economia');
    const $ingresoMensual = $('#ingresoMensual');

    $ingresoMensual.html(`<strong>${economia.ingresoMensual?.value || 'No especificado'}</strong>`);
    const iconMap = {
        alimentacion: { icon: 'shopping-cart', color: 'text-success', label: 'Alimentación' },
        vivienda: { icon: 'home', color: 'text-primary', label: 'Vivienda' },
        celular: { icon: 'phone', color: 'text-danger', label: 'Celular' },
        colegiaturas: { icon: 'book', color: 'text-warning', label: 'Colegiaturas' },
        luz: { icon: 'bolt', color: 'text-warning', label: 'Luz' },
        camiones: { icon: 'bus', color: 'text-success', label: 'Camiones' },
        telefono: { icon: 'phone-call', color: 'text-primary', label: 'Teléfono' },
        gasolina: { icon: 'gas-station', color: 'text-danger', label: 'Gasolina' },
        gas: { icon: 'flame', color: 'text-warning', label: 'Gas' },
        medico: { icon: 'heartbeat', color: 'text-danger', label: 'Médico' },
        agua: { icon: 'droplet', color: 'text-primary', label: 'Agua' },
        diversiones: { icon: 'device-gamepad-2', color: 'text-success', label: 'Diversiones' },
        internet: { icon: 'wifi', color: 'text-danger', label: 'Internet' },
        deudas: { icon: 'credit-card', color: 'text-warning', label: 'Pago de deudas' },
        cable: { icon: 'device-tv', color: 'text-success', label: 'Cable' },
        medicinas: { icon: 'pills', color: 'text-danger', label: 'Medicinas' },
        otros: { icon: 'archive', color: 'text-primary', label: 'Otros' }
    };

    Object.entries(economia).forEach(([key, value]) => {
        if (key === 'ingresoMensual')
            return;

        const { icon, color, label } = iconMap[key] || {
            icon: 'circle-question',
            color: 'text-secondary',
            label: key.charAt(0).toUpperCase() + key.slice(1)
        };

        const html = `
            <div class="col-md-6">
                <div class="d-flex align-items-center justify-content-between border rounded p-3 bg-white h-100">
                    <div class="d-flex align-items-center">
                        <i class="ti ti-${icon} me-2 ${color}"></i>
                        <span class="fw-semibold">${label}</span>
                    </div>
                    <div class="text-end fw-bold text-dark">$${Number(value).toFixed(2)}</div>
                </div>
            </div>
        `;
        $contenedorEconomia.append(html);
    });
}

function crearSeccionVivienda(vivienda) {
    const $viviendaContainer = $('#viviendaDistribucion');
    $viviendaContainer.empty();

    // Campos simples (tipo, condición, etc.)
    const camposSimples = [
        { key: 'tipo', label: 'Tipo de vivienda' },
        { key: 'condicion', label: 'Condición' },
        { key: 'familiasHabitantes', label: 'Familias que habitan' },
        { key: 'uso', label: 'Uso de la vivienda' }
    ];

    camposSimples.forEach(({ key, label }) => {
        if (vivienda[key]) {
            const html = `
                <div class="mb-3">
                    <span class="text-muted">${label}:</span>
                    <span class="fw-semibold text-dark ms-2">${vivienda[key].value}</span>
                </div>
            `;
            $viviendaContainer.append(html);
        }
    });

    // Campos múltiples (piso, techo, etc.)
    const camposMultiples = [
        { key: 'piso', label: 'Tipo de piso' },
        { key: 'techo', label: 'Tipo de techo' },
        { key: 'paredes', label: 'Tipo de paredes' },
        { key: 'distribucion', label: 'Distribución' },
        { key: 'servicios', label: 'Servicios disponibles' }
    ];

    camposMultiples.forEach(({ key, label }) => {
        const valores = vivienda[key];
        if (Array.isArray(valores) && valores.length > 0) {
            const listItems = valores.map(item =>
                `<span class="badge bg-light text-dark me-1 mb-1">${item.value}</span>`
            ).join('');
            const html = `
                <div class="mb-3">
                    <span class="text-muted d-block mb-1">${label}:</span>
                    <div class="d-flex flex-wrap">${listItems}</div>
                </div>
            `;
            $viviendaContainer.append(html);
        }
    });
}

function crearSeccionOtrosBienes(otrosBienes) {
    const { cuentaConVehiculoPropio, tipoVehiculo, marcaVehiculo, modeloVehiculo } = otrosBienes;

    const $container = $('#otrosBienesContainer');
    $container.empty();

    // Indicador de si tiene vehículo
    const tieneVehiculo = cuentaConVehiculoPropio ? 'Sí ' : 'No ';
    $container.append(`
        <div class="mb-3">
            <span class="text-muted">Vehículo propio:</span>
            <span class="fw-semibold text-dark ms-2">${tieneVehiculo} cuenta con vehículo propio.</span>
        </div>
    `);

    // Si tiene vehículo, mostrar detalles
    if (cuentaConVehiculoPropio) {
        const detallesVehiculo = [
            { label: 'Tipo de vehículo', value: tipoVehiculo },
            { label: 'Marca', value: marcaVehiculo },
            { label: 'Modelo', value: modeloVehiculo }
        ];

        detallesVehiculo.forEach(({ label, value }) => {
            $container.append(`
                <div class="mb-3">
                    <span class="text-muted">${label}:</span>
                    <span class="fw-semibold text-dark ms-2">${value}</span>
                </div>
            `);
        });
    }
}

function crearSeccionReferencias(referencias) {
    const {
        comercial,
        personal,
        familiar
    } = referencias;

    const comercialHTML = `
        <div class="col-lg-9">
            <div class="card border shadow-none">
                <div class="card-body p-4">
                    <h4 class="card-title">Referencia Comercial</h4>
                    <p class="card-subtitle mb-4">
                        <strong>Empresa:</strong> ${comercial.empresa} <br>
                        <strong>Monto de crédito:</strong> $${comercial.montoCredito} <br>
                        <strong>Límite de crédito:</strong> $${comercial.limiteCredito}
                    </p>
                </div>
            </div>
        </div>`;

    const personalHTML = `
        <div class="col-lg-9">
            <div class="card border shadow-none">
                <div class="card-body p-4">
                    <h4 class="card-title">Referencia Personal</h4>
                    <p class="card-subtitle mb-4">
                        <strong>Nombre:</strong> ${personal.nombre} <br>
                        <strong>Teléfono:</strong> ${personal.telefono} <br>
                        <strong>Tiempo de conocerlo:</strong> ${personal.tiempoConocerlo} años <br>
                        <strong>Opinión:</strong> ${personal.opinion}
                    </p>
                </div>
            </div>
        </div>`;

    const familiarHTML = `
        <div class="col-lg-9">
            <div class="card border shadow-none">
                <div class="card-body p-4">
                    <h4 class="card-title">Referencia Familiar</h4>
                    <p class="card-subtitle mb-4">
                        <strong>Nombre:</strong> ${familiar.nombre} <br>
                        <strong>Teléfono:</strong> ${familiar.telefono} <br>
                        <strong>Parentesco:</strong> ${familiar.parentesco} <br>
                        <strong>Opinión:</strong> ${familiar.opinion}
                    </p>
                </div>
            </div>
        </div>`;

    $('#referenciasContainer').html(`
        <div class="row justify-content-center">
            ${comercialHTML}
            ${personalHTML}
            ${familiarHTML}
        </div>
    `);
}

function crearSeccionVulnerabilidades(vulnerabilidades) {
    // Verificar si el array está vacío o no
    let contenidoHTML = '';

    if (vulnerabilidades.length === 0) {
        contenidoHTML = `
            <div class="alert alert-info" role="alert">
                NO es vulnerable.
            </div>
        `;
    } else {
        // Crear una lista ordenada usando `ol` y las clases de Bootstrap para vulnerabilidades
        contenidoHTML = `
            <ol class="list-group list-group-numbered">
                ${vulnerabilidades.map(vulnerabilidad => `
                    <li class="list-group-item m-0">
                          ${vulnerabilidad.descripcion}
                    </li>
                `).join('')}
            </ol>
        `;
    }

    // Insertar el contenido en el contenedor
    $('#vulnerabilidadesContainer').html(`
        <div class="row justify-content-center">
            ${contenidoHTML}
        </div>
    `);
}
