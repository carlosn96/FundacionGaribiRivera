/**
 * ID Reference Guide:
 * ==================
 * - id_emprendedor: Identifier from tabla usuario_emprendedor (PRIMARY KEY for emprendedor context)
 *   Used for: Filtering emprendedores, fetching asistencias, linking to etapa
 * 
 * - id_usuario: Identifier from tabla usuario (authentication/login user)
 *   Used for: User authentication, permissions, photo retrieval
 *   NOTE: In this module, we work with id_emprendedor, not id_usuario
 * 
 * URL Parameter:
 * ?id=789  → This is id_emprendedor (NOT usuario.id)
 */

const urlAPI = "api/VerEmprendedorAPI.php";

function ready() {
    const urlParams = new URLSearchParams(window.location.search);
    const emprendedorId = urlParams.get('id');

    if (!emprendedorId) {
        mostrarError("No se proporcionó un ID de emprendedor.");
        return;
    }

    cargarDatosEmprendedor(emprendedorId);
}

function cargarDatosEmprendedor(id) {
    // id parameter is id_emprendedor (NOT usuario.id)
    // This is the ID from ?id=789 in the URL
    const payload = new FormData();
    payload.append('case', 'recuperarEmprendedor');
    payload.append('data', `id_emprendedor=${id}`);  // Explicitly: id_emprendedor

    crearPeticion(urlAPI, payload, function (res) {
        if (!res) {
            mostrarError("No se recibió respuesta del servidor.");
            return;
        }

        if (res.error) {
            mostrarError(res.error);
            return;
        }

        // Hide loading spinner for entrepreneur
        $("#emprendedor-loading-spinner").hide();
        $("#emprendedor-info-container").show();

        renderUserInfo(res.emprendedor);
        renderEtapaInfo(res.etapa);
        renderAsistenciasInfo(res.asistencias);
    });
}

function mostrarError(mensaje) {
    const alertHTML = `
        <div class="alert alert-danger alert-dismissible fade show border-0 rounded-2" role="alert" style="background-color: rgba(220,53,69,0.08);">
            <i class="ti ti-alert-circle me-2" style="color: #dc3545;"></i>
            <strong style="color: #dc3545;">Error:</strong> <span style="color: #dc3545;">${mensaje}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    $("#alert-container").html(alertHTML);
}

function renderUserInfo(user) {
    if (!user) {
        mostrarError("No se encontró información del emprendedor.");
        return;
    }

    try {
        const nombre = user.nombre || "Nombre";
        const apellidos = user.apellidos || "Apellido";
        const nombreCompleto = `${nombre} ${apellidos}`.trim();

        // Default placeholder SVG
        let fotoSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23e0e0e0' width='200' height='200'/%3E%3Ccircle cx='100' cy='70' r='40' fill='%23999999'/%3E%3Cpath d='M50 170 Q50 120 100 120 Q150 120 150 170' fill='%23999999'/%3E%3C/svg%3E";
        
        // Use actual photo from database if available
        if (user.fotografia && user.fotografia.length > 0) {
            // If it's already a data URI, use it directly
            if (user.fotografia.startsWith('data:image')) {
                fotoSrc = user.fotografia;
            }
            // If it's just base64 string, add the data URI header
            else if (user.fotografia.match(/^[A-Za-z0-9+/]+={0,2}$/)) {
                fotoSrc = "data:image/jpeg;base64," + user.fotografia;
            }
        }

        $("#emprendedor-name").text(nombreCompleto);
        $("#emprendedor-photo").attr("src", fotoSrc).on('error', function() {
            // Fallback to placeholder if image fails to load
            $(this).attr("src", "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23e0e0e0' width='200' height='200'/%3E%3Ccircle cx='100' cy='70' r='40' fill='%23999999'/%3E%3Cpath d='M50 170 Q50 120 100 120 Q150 120 150 170' fill='%23999999'/%3E%3C/svg%3E");
        });

        const estatus = user.estatus || "Activo";
        const statusColor = (estatus.toLowerCase() === "activo" || estatus === "1") ? "bg-success" : "bg-warning";
        const statusText = (estatus.toLowerCase() === "activo" || estatus === "1") ? "Activo" : "Inactivo";
        $("#emprendedor-status-badge")
            .removeClass("bg-success bg-warning")
            .addClass(statusColor)
            .html(`<i class="ti ti-circle-filled me-1" style="font-size: 0.5rem;"></i>${statusText}`);

        const email = user.correo_electronico || user.email || "No registrado";
        $("#emprendedor-email").text(email).attr("href", `mailto:${email}`);

        const phone = user.numero_celular || user.telefono || "No registrado";
        let whatsappLink = `tel:${phone}`;
        if (phone && phone !== "No registrado") {
            const cleanPhone = phone.replace(/[\s\(\)-]/g, '').trim();
            whatsappLink = `https://wa.me/${cleanPhone}`;
        }
        $("#emprendedor-phone").text(phone).attr("href", whatsappLink);

        const fechaInscripcion = user.fecha_inscripcion || user.date_created || "—";
        $("#emprendedor-inscription-date").text(formatearFecha(fechaInscripcion));

        const empresa = user.nombre_empresa || user.nombre_negocio || "—";
        $("#emprendedor-business").text(empresa);

    } catch (error) {
        console.error("Error rendering user info:", error);
        mostrarError("Error al procesar información del emprendedor");
    }
}

function renderEtapaInfo(etapa) {
    $("#etapa-loading-spinner").hide();

    if (!etapa || (typeof etapa === 'object' && Object.keys(etapa).length === 0)) {
        $("#etapa-info-container").html(`
            <div class="alert alert-info border-0" role="alert" style="background-color: rgba(24,63,55,0.05);">
                <i class="ti ti-info-circle me-2" style="color: #183f37;"></i>
                <span style="color: #183f37;">El emprendedor no tiene una etapa actual asignada.</span>
            </div>
        `);
        return;
    }

    try {
        const e = Array.isArray(etapa) ? etapa[0] : etapa;

        const nombre = e.nombre || "Etapa sin nombre";
        const tipo = (e.tipo && e.tipo.val) ? e.tipo.val : (e.tipo || "N/A");
        const fechaInicio = e.fechaInicio || "—";
        const fechaFin = e.fechaFin || "—";
        const esActual = e.esActual === true || e.esActual === 1 || e.esActual === "1";

        const html = `
            <div>
                <div class="mb-4 pb-3 border-bottom" style="border-color: #e8ebe9 !important;">
                    <h5 class="text-dark fw-bold mb-2">${nombre}</h5>
                    <div class="d-flex gap-2 flex-wrap">
                        <span class="badge bg-light text-dark border" style="border-color: #183f37 !important; color: #183f37 !important;">
                            <i class="ti ti-tag me-1"></i>${tipo}
                        </span>
                        <span class="badge ${esActual ? 'bg-success' : 'bg-secondary'}">
                            <i class="ti ${esActual ? 'ti-circle-check' : 'ti-circle-x'} me-1"></i>${esActual ? 'En Progreso' : 'Completada'}
                        </span>
                    </div>
                </div>

                <div class="row g-3">
                    <div class="col-6">
                        <div class="p-2">
                            <p class="text-muted small mb-1" style="font-size: 0.75rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Inicio</p>
                            <p class="fw-500 text-dark small mb-0">${formatearFecha(fechaInicio)}</p>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2">
                            <p class="text-muted small mb-1" style="font-size: 0.75rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Fin</p>
                            <p class="fw-500 text-dark small mb-0">${formatearFecha(fechaFin)}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $("#etapa-info-container").html(html);

    } catch (error) {
        console.error("Error rendering stage info:", error);
        $("#etapa-info-container").html(`
            <div class="alert alert-danger border-0" role="alert" style="background-color: rgba(220,53,69,0.05);">
                <i class="ti ti-alert-circle me-2" style="color: #dc3545;"></i>
                <span style="color: #dc3545;">Error al cargar información de la etapa.</span>
            </div>
        `);
    }
}

function renderAsistenciasInfo(asistencias) {
    $("#asistencias-loading-spinner").hide();

    if (!asistencias || asistencias.length === 0) {
        $("#asistencias-list-container").html(`
            <div class="alert alert-info border-0" role="alert" style="background-color: rgba(24,63,55,0.05);">
                <i class="ti ti-info-circle me-2" style="color: #183f37;"></i>
                <span style="color: #183f37;">No hay registro de asistencias en este momento.</span>
            </div>
        `);
        return;
    }

    try {
        let html = `<div class="list-group list-group-flush">`;

        asistencias.forEach((asistencia, index) => {
            const nombreTaller = asistencia.nombre_taller || "Taller sin nombre";
            const fecha = asistencia.fecha || "—";
            const descripcion = asistencia.descripcion || "";
            const asistio = asistencia.asistio === true || asistencia.asistio === 1 || asistencia.asistio === "1";

            const badgeColor = asistio ? "bg-success" : "bg-danger";
            const badgeIcon = asistio ? "ti-check" : "ti-x";
            const badgeText = asistio ? "Asistió" : "Inasistencia";

            html += `
                <div class="list-group-item border-0 border-bottom py-3 px-0" style="border-color: #e8ebe9 !important;">
                    <div class="d-flex justify-content-between align-items-start gap-2">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold text-dark">${nombreTaller}</h6>
                            <small class="text-muted d-block">
                                <i class="ti ti-calendar me-1"></i>${fecha}
                            </small>
                            ${descripcion ? `<small class="text-muted d-block mt-1">${descripcion}</small>` : ''}
                        </div>
                        <span class="badge ${badgeColor} rounded-pill flex-shrink-0 py-2 px-2">
                            <i class="ti ${badgeIcon}"></i>
                        </span>
                    </div>
                </div>
            `;
        });

        html += `</div>`;

        $("#asistencias-list-container").html(html);

    } catch (error) {
        console.error("Error rendering attendances:", error);
        $("#asistencias-list-container").html(`
            <div class="alert alert-danger border-0" role="alert" style="background-color: rgba(220,53,69,0.05);">
                <i class="ti ti-alert-circle me-2" style="color: #dc3545;"></i>
                <span style="color: #dc3545;">Error al cargar asistencias.</span>
            </div>
        `);
    }
}

function formatearFecha(fecha) {
    if (!fecha || fecha === "—") return "—";

    try {
        if (typeof fecha === 'string') {
            const date = new Date(fecha);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                });
            }
        }
        return fecha;
    } catch (error) {
        return fecha;
    }
}

// La inicialización del módulo la dispara controlSesion.js
// después de verificar la sesión.
