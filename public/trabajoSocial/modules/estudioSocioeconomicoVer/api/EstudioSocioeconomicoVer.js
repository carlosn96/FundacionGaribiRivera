
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
    $("#btnActualizarObservaciones").off("click").on("click", function () {
        const $btn = $(this); // Guardar referencia al botón
        const observaciones = $("#observaciones").val()?.trim() || "";
        const originalHTML = $btn.html();
        if (observaciones.length === 0) {
            mostrarMensajeAdvertencia("Las observaciones no pueden estar vacías.", false);
            return;
        }
        if (observaciones.length < 10) {
            mostrarMensajeAdvertencia("Las observaciones deben contener al menos 10 caracteres.", false);
            return;
        }
        // Activar spinner
        $btn
            .prop("disabled", true)
            .html(`<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Actualizando...`);
        // Ejecutar la petición
        crearPeticion(urlAPI, {
            case: "actualizarObservaciones",
            data: $.param({
                observaciones: observaciones,
                id: es.id
            })
        }, function (respuesta) {
            $btn.prop("disabled", false).html(originalHTML);
            if (respuesta.es_valor_error === true) {
                mostrarMensajeError("No se pudo actualizar. Intenta de nuevo.");
            } else {
                mostrarMensajeOk("Observaciones actualizadas correctamente.");
            }
        });
    });

    $("#btnMejorarObservaciones").off("click").on("click", function () {
        const original = $("#observaciones").val()?.trim() || "";
        if (original.length === 0) {
            mostrarMensajeAdvertencia("Las observaciones no pueden estar vacías.", false);
            return;
        }
        // Mostrar modal
        const modal = new bootstrap.Modal(document.getElementById("modalMejorarObservaciones"));
        $("#observacionesOriginal").val(original);
        modal.show();
    });

    $("#btnUsarTextoMejorado").off("click").on("click", function () {
        const text = $("#observacionesMejoradas").val()?.trim() || "";
        if (text.length === 0) {
            mostrarMensajeAdvertencia("Las observaciones no pueden estar vacías.", false);
            return;
        }
        crearPeticion(urlAPI, {
            case: "actualizarObservaciones",
            data: $.param({
                observaciones: text,
                id: es.id
            })
        });
    });

    $("#btnMejorarTextoIA").off("click").on("click", function () {
        const original = $("#observacionesOriginal").val()?.trim() || "";
        const modelo = $("#modeloIA").val();
        const $btn = $(this);

        if (!original) {
            mostrarMensajeAdvertencia("No hay texto original para mejorar.");
            return;
        }

        // Spinner + desactivar
        const originalHTML = $btn.html();
        $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm me-2"></span>Mejorando...');
        crearPeticion(urlAPI, {
            case: "mejorarTextoObservaciones",
            data: $.param({
                texto: original,
                modelo: modelo
            })
        }, function (res) {
            $btn.prop("disabled", false).html(originalHTML);
            if (res.es_respuesta_error === false && res.textoMejorado) {
                $("#observacionesMejoradas").val(res.textoMejorado);
            } else {
                mostrarMensajeError("No se pudo mejorar el texto. Intenta de nuevo.", false);
            }
        });
    });




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

        // Mostrar u ocultar el carrusel según si hay fotografías
        if (!fotografias || fotografias.length === 0) {
            $("#controls").hide();
            $("#carouselEditBtnContainer").hide();
            // Mostrar mensaje amigable de Bootstrap
            if ($("#mensajeSinFotos").length === 0) {
                $("#controls").after(`
                <div id="mensajeSinFotos" class="alert alert-danger text-center mt-3 mb-0" role="alert">
                    <i class="ti ti-info-circle me-2"></i>
                    No hay fotografías registradas para esta visita.
                </div>
            `);
            }
            return;
        } else {
            $("#controls").show();
            $("#mensajeSinFotos").remove();
        }

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

        // Agregar el contenedor de botones alineados y agrupados
        $("#items").parent().after(`
            <div id="carouselEditBtnContainer" class="d-flex justify-content-center gap-2 mb-4">
                <button id="btnEditarFoto" class="btn btn-outline-warning d-flex align-items-center">
                    <i class="ti ti-edit me-2"></i> Cambiar
                </button>
                <button id="btnEliminarFoto" class="btn btn-outline-danger d-flex align-items-center">
                    <i class="ti ti-trash me-2"></i> Eliminar
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
            $("#btnEditarFoto, #btnEliminarFoto").data("foto-id", idFotoActual);
        });

        // Inicializar el id en el botón al cargar
        $("#btnEditarFoto, #btnEliminarFoto").data("foto-id", getFotoIdActual());

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

        // Evento click para eliminar la foto actual
        $("#btnEliminarFoto").off("click").on("click", function () {
            const idFoto = $(this).data("foto-id");
            alertaEliminar({
                mensajeAlerta: "La fotografía se eliminará permanentemente.",
                url: urlAPI,
                data: {
                    case: "eliminarFotografia",
                    data: $.param({ idFoto: idFoto })
                }
            });
        });
    };
    crearCarousel(es.fotografias);
    let nuevasFotos = [];

    // Previsualización y gestión de archivos seleccionados
    $("#inputAgregarFotos").on("change", function (e) {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        let errores = [];


        files.forEach(file => {
            if (!validTypes.includes(file.type)) {
                errores.push(file.name);
                return;
            }
            const reader = new FileReader();
            reader.onload = function (evt) {
                nuevasFotos.push({
                    name: file.name,
                    type: file.type,
                    dataUrl: evt.target.result
                });
                renderPreviews();
            };
            reader.readAsDataURL(file);
        });
        $(this).val("");
    });
    // Renderiza las previsualizaciones y habilita el botón guardar
    function renderPreviews() {
        const $preview = $("#previewFotos");
        $preview.empty();
        nuevasFotos.forEach((foto, idx) => {
            $preview.append(`
            <div class="col position-relative">
                <div class="card shadow-sm">
                    <img src="${foto.dataUrl}" class="card-img-top img-thumbnail" style="object-fit:cover; height:140px;" alt="Nueva foto">
                    <button type="button" class="btn-close position-absolute top-0 end-0 m-1" aria-label="Eliminar" title="Eliminar" onclick="eliminarPreviewFoto(${idx})"></button>
                    <div class="card-body p-2">
                        <small class="text-truncate d-block">${foto.name}</small>
                    </div>
                </div>
            </div>
        `);
        });
        // Habilita o deshabilita el botón guardar
        $("#btnGuardarFotos").prop("disabled", nuevasFotos.length === 0);
    }

    // Elimina una foto del array y actualiza la vista
    window.eliminarPreviewFoto = function (idx) {
        nuevasFotos.splice(idx, 1);
        renderPreviews();
    };

    // Evento para guardar las fotos seleccionadas
    $("#btnGuardarFotos").on("click", function () {
        if (nuevasFotos.length === 0) return;
        fotografiasInsertar = nuevasFotos.map(foto => (
            foto.dataUrl.split(',')[1]
        ));
        print(fotografiasInsertar);
        crearPeticion(urlAPI, {
            case: "agregarFotografias",
            data: $.param({
                idConclusiones: es.id,
                fotos: fotografiasInsertar
            })
        });
        // Limpia el array y la vista tras guardar
        nuevasFotos = [];
        renderPreviews();
    });

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
