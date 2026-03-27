class PagosController {
    static prefix = 'cobranza/pagos';
    static prefixParciales = 'cobranza/pagos-parciales';

    static async getPagos(idEmprendedor) {
        return await apiRequest(`${this.prefix}/${idEmprendedor}`, 'GET');
    }

    static async getFechasPendientes(idEmprendedor) {
        return await apiRequest(`${this.prefix}/${idEmprendedor}/fechas`, 'GET');
    }

    static async processPago(data) {
        return await apiRequest(this.prefix, 'POST', data);
    }

    static async deletePago(idPago) {
        return await apiRequest(`${this.prefix}/${idPago}`, 'DELETE');
    }
    
    static async updateFechaRecepcion(idPago, fechaRecepcion) {
        return await apiRequest(`${this.prefix}/${idPago}/fecha-recepcion`, 'PUT', { fechaRecepcion });
    }

    // Parciales
    static async processPagoParcial(data) {
        return await apiRequest(this.prefixParciales, 'POST', data);
    }

    static async deletePagoParcial(idPago) {
        return await apiRequest(`${this.prefixParciales}/${idPago}`, 'DELETE');
    }

    // Verificar existencia previa del Expediente
    static async verificarExpediente(idEmprendedor) {
        return await apiRequest(`cobranza/expediente/${idEmprendedor}`, 'GET');
    }

    static async getPerfilEmprendedor(id) {
        return await apiRequest('emprendedor/perfil/' + id, 'GET');
    }
}

let estadoPagos = {
    pagosMensuales: [],
    pagosParciales: [],
    emprendedor: null,
    fechasVencimiento: []
};

async function ready() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        mostrarMensajeError('ID de emprendedor no especificado');
        return;
    }

    inicializarTablas();
    inicializarEventos();
    await recargarTodaLaInformacion(id);
}

async function recargarTodaLaInformacion(id) {
    try {
        const [resPagos, resFechas, resPerfil] = await Promise.all([
            PagosController.getPagos(id),
            PagosController.getFechasPendientes(id),
            PagosController.getPerfilEmprendedor(id)
        ]);
        
        estadoPagos.pagosMensuales = (resPagos.data && resPagos.data.pagosMensuales) ? resPagos.data.pagosMensuales : [];
        estadoPagos.pagosParciales = (resPagos.data && resPagos.data.pagosParciales) ? resPagos.data.pagosParciales : [];
        estadoPagos.fechasVencimiento = (resFechas.data && resFechas.data.fechas) ? resFechas.data.fechas : [];
        
        const perfil = (resPerfil && resPerfil.data) ? resPerfil.data : resPerfil;
        estadoPagos.emprendedor = perfil;

        // Verificar existencia de expediente
        if (!perfil || !perfil.expediente) {
            $('#panel-pagos').addClass('d-none');
            $('#cta-expediente').attr('href', `../expediente/?id=${id}`);
            $('#estado-incompleto').removeClass('d-none');
            return;
        }

        // Si tiene expediente, procedemos a mostrar el dashboard
        $('#estado-incompleto').addClass('d-none');
        $('#panel-pagos').removeClass('d-none');

        llenarInformacionDelEmprendedor();
        poblarTablaMensuales();
        poblarTablaParciales();
        poblarSelectFechas();
        calcularSaldoRestante();
        
    } catch (error) {
        console.error("Error al recargar la informacion:", error);
    }
}

function inicializarTablas() {
    // Si queremos datatables 
}

function inicializarEventos() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    $('#btn-cancelar').on('click', () => {
        window.location.href = '../inicio/';
    });

    $('#btn-agregar-pago').on('click', () => {
        $('#form-pago')[0].reset();
        $('#modalAgregarPago').modal('show');
    });

    $('#btn-agregar-parcial').on('click', () => {
        $('#form-parcial')[0].reset();
        $('#modalPagoParcial').modal('show');
    });

    // Guardar Pago
    $('#form-pago').on('submit', async function(e) {
        e.preventDefault();
        $(this).validate();
        if(!$(this).valid()) return;

        const data = {
            idEmprendedor: id,
            monto: $('#montoMensualidad').val(),
            tipoPago: $('#tipoPago').val(),
            aportacionSolidaria: $('#aportacionSolidaria').val() || 0,
            donativo: $('#donativo').val() || 0,
            fechaAplicacion: $('#fechaAplicacion').val(),
            fechaRecepcion: $('#fechaRecepcion').val()
        };

        try {
            loadingBtn($('#btn-guardar-pago'), true);
            const res = await PagosController.processPago(data);
            if (res.status === 200 || res.status === 201) {
                mostrarMensajeOk(res.message || 'Pago registrado con éxito.');
                $('#modalAgregarPago').modal('hide');
                await recargarTodaLaInformacion(id);
            } else {
                mostrarMensajeError(res.message);
            }
        } catch (error) {
            console.error(error);
            mostrarMensajeError('Ocurrió un error al procesar la solicitud.');
        } finally {
            loadingBtn($('#btn-guardar-pago'), false);
        }
    });

    // Guardar Pago Parcial
    $('#form-parcial').on('submit', async function(e) {
        e.preventDefault();
        $(this).validate();
        if(!$(this).valid()) return;

        const data = {
            idEmprendedor: id,
            monto: $('#montoParcial').val(),
            fecha: $('#fechaAbono').val()
        };

        try {
            loadingBtn($('#btn-guardar-parcial'), true);
            const res = await PagosController.processPagoParcial(data);
            if (res.status === 200 || res.status === 201) {
                mostrarMensajeOk(res.message || 'Abono registrado con éxito.');
                $('#modalPagoParcial').modal('hide');
                await recargarTodaLaInformacion(id);
            } else {
                mostrarMensajeError(res.message);
            }
        } catch (error) {
            console.error(error);
            mostrarMensajeError('Error al guardar el abono.');
        } finally {
            loadingBtn($('#btn-guardar-parcial'), false);
        }
    });
}

function llenarInformacionDelEmprendedor() {
    const perfil = estadoPagos.emprendedor;
    if (!perfil) return;
    
    $('#nombre-completo').text(`${perfil.nombre} ${perfil.apellidos}`);
    $('#referencia').text(perfil.referencia || 'N/A');
    
    if (perfil.usuario.fotografia_base64) {
        $('#foto-emprendedor-pagos').attr('src', 'data:image/png;base64,' + perfil.usuario.fotografia_base64).removeClass('d-none');
        $('#icono-default').addClass('d-none');
    }

    if (perfil.expediente) {
        $('#monto-apoyo').text(toMoneda(perfil.expediente.montoSolicitado));
        $('#total-mensualidades').text(perfil.expediente.cantidadDocumentosElaborados);
        $('#monto-doc').text(toMoneda(perfil.expediente.montoDocumento));
    }
}

function calcularSaldoRestante() {
    const perfil = estadoPagos.emprendedor;
    if (!perfil) return;
    if (!perfil.expediente) return;
    
    const totalApoyo = parseFloat(perfil.expediente.montoSolicitado) || 0;
    
    // Sumar pagos efectivos
    const sumMensuales = estadoPagos.pagosMensuales.reduce((acc, p) => acc + parseFloat(p.monto), 0);
    const sumParciales = estadoPagos.pagosParciales.reduce((acc, p) => acc + parseFloat(p.monto), 0);
    
    const totalPagado = sumMensuales + sumParciales;
    const restante = Math.max(0, totalApoyo - totalPagado);
    
    // Barra de progreso
    const pc = (totalApoyo > 0) ? (totalPagado / totalApoyo) * 100 : 0;
    
    $('#saldo-restante').text(toMoneda(restante));
    $('#progreso-lbl').text(pc.toFixed(1) + '% Pagado');
    $('#barra-progreso').css('width', pc + '%');
    
    if (pc >= 100) {
        $('#barra-progreso').removeClass('bg-primary').addClass('bg-success');
    } else {
        $('#barra-progreso').removeClass('bg-success').addClass('bg-primary');
    }
}

function poblarSelectFechas() {
    const $select = $('#fechaAplicacion');
    $select.empty();
    $select.append(`<option value="">Selecciona fecha vencimiento...</option>`);
    
    const fechas = estadoPagos.fechasVencimiento;
    fechas.forEach((f) => {
        $select.append(`<option value="${f}">${f}</option>`);
    });
}

function poblarTablaMensuales() {
    const data = estadoPagos.pagosMensuales;
    const body = $('#tbody-mensuales');
    body.empty();
    
    if (data.length === 0) {
        body.append(`<tr><td colspan="7" class="text-center text-muted py-4">Sin pagos registrados</td></tr>`);
        return;
    }
    
    data.forEach(p => {
        body.append(`
            <tr>
                <td class="fw-semibold">${p.numeroRecibo}</td>
                <td><span class="badge ${p.tipoPago === 'Mensual' ? 'bg-primary' : 'bg-info'} bg-opacity-10 text-dark">${p.tipoPago}</span></td>
                <td class="fw-bold">${toMoneda(p.monto)}</td>
                <td>${p.fechaAplicacion}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <span class="me-2 fecha-lbl">${p.fechaRecepcion}</span>
                        <button class="btn btn-sm btn-link text-muted p-0 ms-auto btn-editar-fecha" data-id="${p.idPago}" data-val="${p.fechaRecepcion}">
                            <i class="fas fa-pencil-alt text-xs"></i>
                        </button>
                    </div>
                </td>
                <td>${p.createdAt.substring(0, 10)}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger btn-eliminar-pago" data-id="${p.idPago}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `);
    });

    bindDeleteTokens();
}

function poblarTablaParciales() {
    const data = estadoPagos.pagosParciales;
    const body = $('#tbody-parciales');
    body.empty();
    
    if (data.length === 0) {
        body.append(`<tr><td colspan="4" class="text-center text-muted py-4">Sin abonos parciales</td></tr>`);
        return;
    }
    
    data.forEach(p => {
        body.append(`
            <tr>
                <td class="fw-bold">${toMoneda(p.monto)}</td>
                <td>${p.fecha}</td>
                <td>${p.createdAt.substring(0,10)}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger btn-eliminar-parcial" data-id="${p.idPago}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `);
    });
    
    bindDeleteTokensParciales();
}

function bindDeleteTokens() {
    $('.btn-eliminar-pago').off('click').on('click', async function() {
        const id = $(this).data('id');
        const urlParams = new URLSearchParams(window.location.search);
        const idEmprendedor = urlParams.get('id');
        
        const cfm = await Swal.fire({
            title: '¿Confirmar eliminación?',
            text: "El pago será eliminado permanentemente del sistema.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#a1aab2',
            confirmButtonText: 'Sí, eliminar'
        });

        if (cfm.isConfirmed) {
            try {
                const res = await PagosController.deletePago(id);
                if (res.status === 200 || res.status === 201) {
                    mostrarMensajeOk(res.message || 'Pago eliminado.');
                    await recargarTodaLaInformacion(idEmprendedor);
                } else {
                    mostrarMensajeError(res.message);
                }
            } catch (e) {
                mostrarMensajeError('Ocurrió un error.');
            }
        }
    });

    $('.btn-editar-fecha').off('click').on('click', async function() {
        const idPago = $(this).data('id');
        const val = $(this).data('val');
        
        const { value: nuevaFecha } = await Swal.fire({
            title: 'Actualizar Fecha de Recepción',
            input: 'date',
            inputValue: val,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        });

        if (nuevaFecha) {
            try {
                const res = await PagosController.updateFechaRecepcion(idPago, nuevaFecha);
                if (res.status === 200 || res.status === 201) {
                    mostrarMensajeOk(res.message || 'Fecha actualizada');
                    const urlParams = new URLSearchParams(window.location.search);
                    await recargarTodaLaInformacion(urlParams.get('id'));
                } else {
                    mostrarMensajeError(res.message);
                }
            } catch (e) {
                mostrarMensajeError('Error de red');
            }
        }
    });
}

function bindDeleteTokensParciales() {
    $('.btn-eliminar-parcial').off('click').on('click', async function() {
        const id = $(this).data('id');
        const urlParams = new URLSearchParams(window.location.search);
        const idEmprendedor = urlParams.get('id');
        
        const cfm = await Swal.fire({
            title: '¿Eliminar Abono Parcial?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, borrar'
        });

        if (cfm.isConfirmed) {
            try {
                const res = await PagosController.deletePagoParcial(id);
                if (res.status === 200 || res.status === 201) {
                    mostrarMensajeOk(res.message || 'Abono eliminado.');
                    await recargarTodaLaInformacion(idEmprendedor);
                } else {
                    mostrarMensajeError(res.message);
                }
            } catch (e) {
                mostrarMensajeError('Ocurrió un error.');
            }
        }
    });
}
