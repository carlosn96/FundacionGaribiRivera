var urlAction = "action/InicioAdministracionAPI.php";
var loadedContacts = [];

// Variables globales para el modal
var modalUsuario;
var formUsuario;
var modoEdicion = false;
var usuarioActualId = null;
var permisosDisponibles = [];

// Creates HTML for the contact list items
function createChatUsersList(contacts) {
    //print(contacts);
    const chatUsersHtml = contacts.map(contact => `
        <li class="border-bottom">
            <a href="javascript:void(0)"
                class="d-flex align-items-center gap-3 text-decoration-none chat-user px-4 py-3 transition-all"
                id="chat_user_${contact.id}" 
                data-user-id="${contact.id}">
                <div class="position-relative flex-shrink-0">
                    <img src="${contact.image}" 
                         alt="${contact.name}" 
                         width="48"
                         height="48" 
                         class="rounded-circle object-fit-cover border border-2 border-light shadow-sm">
                    <span class="position-absolute bottom-0 end-0 p-1 bg-success border border-2 border-white rounded-circle"
                          style="width: 12px; height: 12px;"></span>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                    <h6 class="mb-1 fw-semibold text-dark chat-title text-truncate" 
                        data-username="${contact.name}">${contact.name}</h6>
                    <p class="mb-0 text-muted small text-truncate">${contact.email ? contact.email : 'Sin correo'}</p>
                </div>
            </a>
        </li>
    `).join('');
    return chatUsersHtml;
}

function createContactDetails(contact) {
    const chatListHtml = `
        <div class="chat-list chat px-3 py-2" data-user-id="${contact.id}">
            <div class="card border-0 shadow-sm mb-3">
                <div class="card-body p-3">
                    <!-- Profile Header -->
                    <div class="d-flex align-items-center gap-3 mb-3 border-bottom pb-3">
                        <div class="position-relative">
                            <img src="${contact.image}" 
                                 alt="${contact.name}" 
                                 class="rounded-circle border border-primary border-2 shadow-sm" 
                                 width="64" height="64">
                            <span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-white rounded-circle"></span>
                        </div>
                        <div class="flex-grow-1">
                            <h5 class="mb-0 fw-bold">${contact.name}</h5>
                            <small class="text-muted d-block">
                                <i class="ti ti-briefcase me-1"></i>Usuario activo
                            </small>
                        </div>
                    </div>

                    <!-- Contact Info -->
                    <div class="mb-3">
                        <div class="d-flex align-items-start gap-2 mb-2">
                            <i class="ti ti-phone text-primary fs-5"></i>
                            <div>
                                <small class="text-muted">Teléfono</small>
                                <div class="fw-semibold">${contact.phone || 'No disponible'}</div>
                            </div>
                        </div>
                        <div class="d-flex align-items-start gap-2">
                            <i class="ti ti-mail text-info fs-5"></i>
                            <div>
                                <small class="text-muted">Correo electrónico</small>
                                <div class="fw-semibold text-break">${contact.email || 'No disponible'}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Permisos asignados -->
                    <div class="mb-3">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class="ti ti-shield-check text-success fs-5"></i>
                            <small class="text-muted">Permisos asignados</small>
                        </div>
                        <ul class="list-group list-group-flush small">
                            ${contact.permisos_descripcion?.length
            ? contact.permisos_descripcion.map(permiso => `
                                        <li class="list-group-item px-2 py-1 border-0 bg-light rounded mb-1">
                                            ${permiso}
                                        </li>
                                    `).join('')
            : '<small class="text-muted fst-italic">No tiene permisos asignados.</small>'
        }
                        </ul>
                    </div>

                    <!-- Botón -->
                    <div class="text-end mt-3">
                        <button class="btn btn-sm btn-outline-primary"
                                onclick="cambiarContrasena(${contact.id})">
                            Cambiar contraseña
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return chatListHtml;
}

// Renders contacts to the UI
function renderContacts(contactsToRender) {
    if (contactsToRender && contactsToRender.length > 0) {
        // Populate chat users list
        const chatUsersHtml = createChatUsersList(contactsToRender);
        $('.chat-users').html(chatUsersHtml);

        // Populate contact details views
        let allContactDetailsHtml = '';
        contactsToRender.forEach(contact => {
            allContactDetailsHtml += createContactDetails(contact);
        });
        $('.chat-box.email-box').html(allContactDetailsHtml);

        // Set first user as active by default
        $('.chat-user').first().addClass('active');
        $('.chat-list.chat').first().addClass('active-chat');

        // Initialize Bootstrap tooltips
        initializeTooltips();
    } else {
        $('.chat-users').html('<li class="px-4 py-5 text-center text-muted">No se encontraron usuarios</li>');
        $('.chat-box.email-box').html(`
            <div class="d-flex align-items-center justify-content-center h-100">
                <div class="text-center py-5">
                    <i class="ti ti-users-off d-block mb-3" style="font-size: 4rem; color: var(--bs-secondary);"></i>
                    <h5 class="text-muted">No hay usuarios disponibles</h5>
                    <p class="text-muted mb-0">Intenta con otro filtro o término de búsqueda</p>
                </div>
            </div>
        `);
    }
}

// Initial load and transformation of contacts
function loadContacts(contactData) {
    const formattedContacts = contactData.map(contact => {
        const base64Image = `data:image/jpeg;base64,${contact.fotografia}`;
        return {
            id: contact.id,
            name: `${contact.nombre} ${contact.apellidos}`,
            image: base64Image,
            phone: contact.numero_celular,
            permisos: contact.permisos,
            permisos_descripcion: contact.permisos_descripcion,
            email: contact.correo_electronico
        };
    });

    loadedContacts = formattedContacts;
    renderContacts(loadedContacts);
}

// Loads user roles/permissions into the sidebar
function loadPermisosUsuario(permisosUsuario) {
    const colors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'];
    const icons = ['ti-lock', 'ti-shield', 'ti-key', 'ti-user-check', 'ti-certificate', 'ti-shield-check'];
    let colorIndex = 0;

    let rolesHtml = '';

    if (permisosUsuario && Array.isArray(permisosUsuario)) {
        permisosUsuario.forEach(permiso => {
            const roleName = permiso.rol;
            const roleId = permiso.id;
            const color = colors[colorIndex % colors.length];
            const icon = icons[colorIndex % icons.length];

            rolesHtml += `
                <li class="list-group-item border-0 bg-transparent px-4 py-2">
                    <a class="d-flex align-items-center gap-3 text-decoration-none text-dark px-3 py-2 rounded-2 role-filter-button transition-all"
                        href="javascript:void(0)" 
                        data-role-id="${roleId}">
                        <div class="d-flex align-items-center justify-content-center bg-${color} bg-opacity-10 rounded-2 flex-shrink-0" 
                             style="width: 40px; height: 40px;">
                            <i class="ti ${icon} fs-5 text-${color}"></i>
                        </div>
                        <span class="fw-semibold">${roleName}</span>
                    </a>
                </li>
            `;
            colorIndex++;
        });
    }

    // Populate both desktop and mobile containers
    $('#user-roles-container').html(rolesHtml);
    $('#user-roles-container-mobile').html(rolesHtml);
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Cargar el modal HTML dinámicamente
function cargarModalUsuario() {
    // Aquí cargarías el HTML del modal desde tu archivo
    // Por ejemplo: $.get('ruta/modal-usuario.html', function(html) { $('body').append(html); });
    // Para este ejemplo, asumimos que ya está en el DOM
    inicializarModal();
}

// Inicializar el modal y sus eventos con jQuery + apertura directa
function inicializarModal() {
    const $modal = $('#modalUsuario');
    const $form = $('#formUsuario');
    const $inputFoto = $('#fotografia');
    const $btnGuardar = $('#btnGuardarUsuario');

    // Guardar referencia al formulario si es necesario globalmente
    formUsuario = $form[0];

    // Abrir el modal
    $modal.modal('show');

    // Vista previa de imagen
    $inputFoto.on('change', function () {
        const archivo = this.files[0];
        if (archivo) previsualizarImagen(archivo);
    });

    // Guardar usuario
    $btnGuardar.on('click', function () {
        guardarUsuario();
    });

    // Resetear formulario al cerrar modal
    $modal.on('hidden.bs.modal', function () {
        resetearFormulario();
    });
}

// Cargar roles/permisos en el modal
function cargarRolesEnModal(permisos) {
    permisosDisponibles = permisos || [];
    const container = $('#rolesCheckboxContainer');

    if (!permisos || permisos.length === 0) {
        container.html(`
            <div class="text-center text-muted py-3">
                <i class="ti ti-alert-circle fs-4"></i>
                <p class="mb-0 small">No hay roles disponibles</p>
            </div>
        `);
        return;
    }

    let rolesHtml = '<div class="d-flex flex-wrap gap-2">';
    permisos.forEach(permiso => {
        rolesHtml += `
            <div class="role-pill-wrapper">
                <input class="role-checkbox-hidden" 
                       type="checkbox" 
                       value="${permiso.id}" 
                       id="rol_${permiso.id}">
                <label class="role-pill-label" for="rol_${permiso.id}">
                    ${permiso.rol}
                </label>
            </div>
        `;
    });
    rolesHtml += '</div>';

    container.html(rolesHtml);
}


// Previsualizar imagen seleccionada
function previsualizarImagen(file) {
    if (file) {
        // Validar tamaño (2MB máximo)
        if (file.size > 2 * 1024 * 1024) {
            mostrarMensajeError("La imagen no debe superar los 2MB", false);
            $('#fotografia').val('');
            return;
        }

        // Validar tipo de archivo
        if (!file.type.match('image.*')) {
            mostrarMensajeError("Por favor seleccione una imagen válida", false);
            $('#fotografia').val('');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            $('#preview-imagen').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Abrir modal para nuevo usuario
function abrirModalNuevoUsuario() {
    modoEdicion = false;
    usuarioActualId = null;

    $('#modalUsuarioLabel').text('Nuevo Usuario');
    $('#modalUsuario').find('small').text('Complete la información del usuario');
    $('#btnGuardarUsuario').html('<i class="ti ti-device-floppy me-1"></i>Guardar Usuario');

    resetearFormulario();
    cargarRolesEnModal(permisosDisponibles);

    // Mostrar sección de contraseña para nuevo usuario
    $('#seccionContrasena').show();
    $('#generar_contrasena_auto').prop('checked', true).trigger('change');
    modalUsuario.show();
}

// Abrir modal para editar usuario
function abrirModalEditarUsuario(userId) {
    // Buscar el usuario en los contactos cargados
    const usuario = loadedContacts.find(c => c.id === userId);

    if (!usuario) {
        mostrarMensajeError("Usuario no encontrado", false);
        return;
    }

    modoEdicion = true;
    usuarioActualId = userId;

    $('#modalUsuarioLabel').text('Editar Usuario');
    $('#modalUsuario').find('small').text('Modifique la información del usuario');
    $('#btnGuardarUsuario').html('<i class="ti ti-device-floppy me-1"></i>Actualizar Usuario');

    resetearFormulario();
    cargarRolesEnModal(permisosDisponibles);

    // Llenar el formulario con los datos del usuario
    llenarFormularioUsuario(usuario);

    // Ocultar sección de contraseña al editar
    $('#seccionContrasena').hide();

    modalUsuario.show();
}

// Llenar formulario con datos del usuario
function llenarFormularioUsuario(usuario) {
    // Separar nombre y apellidos
    const nombreCompleto = usuario.name.split(' ');
    const nombre = nombreCompleto[0] || '';
    const apellidos = nombreCompleto.slice(1).join(' ') || '';

    $('#usuarioId').val(usuario.id);
    $('#nombre').val(nombre);
    $('#apellidos').val(apellidos);
    $('#correo').val(usuario.email || '');
    $('#telefono').val(usuario.phone || '');

    // Marcar los roles/permisos del usuario
    if (usuario.permisos && usuario.permisos.length > 0) {
        usuario.permisos.forEach(permisoId => {
            $(`#rol_${permisoId}`).prop('checked', true);
        });
    }

    // Cargar imagen de perfil
    if (usuario.image) {
        $('#preview-imagen').attr('src', usuario.image);
    }
}

// Resetear formulario
function resetearFormulario() {
    if (formUsuario) {
        // Usar jQuery para un reseteo más fiable a través de los campos
        $('#formUsuario')[0].reset();
        formUsuario.classList.remove('was-validated');
    }

    $('#usuarioId').val('');
    $('#nombre, #apellidos, #correo, #telefono').val(''); // Limpiar campos explícitamente
    $('#rolesError').hide();

    // Desmarcar todos los checkboxes de roles
    $('.role-checkbox-hidden').prop('checked', false);
    $('#fotografia').val(''); // Limpiar el input de archivo

    // Resetear campos de contraseña
    $('#contrasena').val('').prop('required', false).prop('disabled', true);
    $('#generar_contrasena_auto').prop('checked', true);

    // Resetear imagen de previsualización
    $('#preview-imagen').attr('src', "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23adb5bd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E");
}

// Validar y guardar usuario
function guardarUsuario() {
    // Validar formulario
    if (!formUsuario.checkValidity()) {
        formUsuario.classList.add('was-validated');
        return;
    }

    // Validar que al menos un rol esté seleccionado
    const rolesSeleccionados = $('.role-checkbox-hidden:checked').map(function () {
        return parseInt($(this).val());
    }).get();

    if (rolesSeleccionados.length === 0) {
        $('#rolesError').show();
        return;
    } else {
        $('#rolesError').hide();
    }

    // Recopilar datos del formulario
    const formData = new FormData();
    formData.append('case', modoEdicion ? 'actualizarUsuario' : 'crearUsuario');

    let datosUsuario = {
        nombre: $('#nombre').val(),
        apellidos: $('#apellidos').val(),
        correo: $('#correo').val(),
        telefono: $('#telefono').val(),
        permisos: JSON.stringify(rolesSeleccionados)
    };

    // Añadir contraseña si es modo creación y se ingresó manualmente
    if (!modoEdicion && !$('#generar_contrasena_auto').is(':checked')) {
        datosUsuario.contrasena = $('#contrasena').val();
    }

    if (modoEdicion) {
        datosUsuario.id = usuarioActualId;
    }

    formData.append('data', $.param(datosUsuario));

    // Agregar imagen si fue seleccionada
    const fotografiaInput = $("#fotografia")[0];
    if (fotografiaInput.files.length > 0) {
        formData.append('fotografia', fotografiaInput.files[0]);
    }

    // Deshabilitar botón de guardar
    const btnGuardar = $('#btnGuardarUsuario');
    btnGuardar.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Guardando...');

    crearPeticion(urlAction, formData, function (res) {
        print(res);
        const msg = res.msg;
        if (msg.es_valor_error) {
            btnGuardar.prop('disabled', false);
            mostrarMensajeError(msg.mensaje || "Error al guardar el usuario", false);
            return;
        } else {
            if (modoEdicion) {
                btnGuardar.html('<i class="ti ti-device-floppy me-1"></i>Actualizar Usuario');
                mensaje = "Usuario actualizado correctamente";
            } else {
                btnGuardar.html('<i class="ti ti-device-floppy me-1"></i>Guardar Usuario');
                mensaje = msg.mensaje + "\nSe insertó el usuario con contraseña: " + res.contrasena;
            }
            mostrarMensajeOk(mensaje);
        }
    });
}

// Eliminar usuario
function eliminarUsuario(userId) {
    alertaEliminar({
        mensajeAlerta: "El usuario no podrá acceder al sistema después de ser eliminado.",
        url: urlAction,
        data: $.param({ case: 'eliminarUsuario', data: $.param({ id: userId }) })
    });
}

// Funciones auxiliares para mensajes (si no existen)
function mostrarMensajeExito(mensaje) {
    // Implementar según tu sistema de notificaciones
    console.log("✓ " + mensaje);
    alert(mensaje);
}

// Sets up event handlers
function setEvents() {
    // Disable edit/delete buttons initially
    $('#btn-editar-usuario, #btn-eliminar-usuario').prop('disabled', true).removeAttr('onclick');

    $('body')
        .off('keyup.chat.search')
        .on('keyup.chat.search', '.search-chat', function () {
            const searchTerm = $(this).val().toLowerCase();
            const filteredContacts = loadedContacts.filter(contact =>
                contact.name.toLowerCase().includes(searchTerm) ||
                (contact.email && contact.email.toLowerCase().includes(searchTerm)) ||
                (contact.phone && contact.phone.toLowerCase().includes(searchTerm))
            );
            renderContacts(filteredContacts);
        })
        .off('click.chat.user')
        .on('click.chat.user', '.chat-user', function () {
            const userId = $(this).data('user-id');

            // Update active states
            $('.chat-user').removeClass('active');
            $(this).addClass('active');
            $('.chat-list.chat').removeClass('active-chat');
            $('.chat-list.chat[data-user-id="' + userId + '"]').addClass('active-chat');

            // --- Responsive logic using Bootstrap classes ---
            if ($(window).width() < 992) { // Mobile view
                var listPanel = $('.user-chat-box').closest('.border-end');
                listPanel.addClass('d-none');
                listPanel.removeClass('w-100'); // Reset width

                $('.chat-container').closest('.flex-grow-1').removeClass('d-none');
            }
            $(".chatting-box.app-email-chatting-box").removeClass('d-none');


            // Update onclick attributes and enable buttons
            $('#btn-editar-usuario').attr('onclick', `abrirModalEditarUsuario(${userId})`).prop('disabled', false);
            $('#btn-eliminar-usuario').attr('onclick', `eliminarUsuario(${userId})`).prop('disabled', false);

            // Hide mobile sidebar
            const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('chat-sidebar'));
            if (offcanvas) offcanvas.hide();
        })
        .off('click.chat.rolefilter')
        .on('click.chat.rolefilter', '.role-filter-button', function () {
            const roleId = parseInt($(this).data('role-id'), 10);
            const filteredContacts = loadedContacts.filter(contact => contact.permisos && contact.permisos.includes(roleId));
            $('.role-filter-button, .all-contacts-btn').removeClass('active');
            $(this).addClass('active');
            renderContacts(filteredContacts);
            const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('chat-sidebar'));
            if (offcanvas) offcanvas.hide();
        })
        .off('click.chat.allcontacts')
        .on('click.chat.allcontacts', '.all-contacts-btn', function () {
            $('.role-filter-button, .all-contacts-btn').removeClass('active');
            $(this).addClass('active');
            renderContacts(loadedContacts);
            const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('chat-sidebar'));
            if (offcanvas) offcanvas.hide();
        })
        .off('click.chat.newuser')
        .on('click.chat.newuser', 'button:contains("Nuevo usuario")', function () {
            abrirModalNuevoUsuario();
        })
        .off("click.chat.back")
        .on("click.chat.back", ".back-btn", function () {
            var listPanel = $('.user-chat-box').closest('.border-end');
            listPanel.removeClass('d-none');
            listPanel.addClass('w-100'); // Make it full-width

            $('.chat-container').closest('.flex-grow-1').addClass('d-none');
        })
        .off("click.password.toggle")
        .on("click.password.toggle", "#toggleNuevaContrasena, #toggleConfirmarContrasena", function () {
            const input = $(this).prev("input");
            const icon = $(this).find("i");
            if (input.attr("type") === "password") {
                input.attr("type", "text");
                icon.removeClass("ti-eye").addClass("ti-eye-off");
            } else {
                input.attr("type", "password");
                icon.removeClass("ti-eye-off").addClass("ti-eye");
            }
        })
        .off("click.password.save")
        .on("click.password.save", "#btnGuardarNuevaContrasena", guardarContrasena);

    initializeTooltips();
}

function cambiarContrasena(userId) {
    // Limpiar el formulario y los mensajes de error anteriores
    $('#formCambiarContrasena')[0].reset();
    $('#formCambiarContrasena').removeClass('was-validated');
    $('#nuevaContrasena, #confirmarContrasena').removeClass('is-invalid');

    // Set the user ID in the hidden input of the modal
    $('#cambiarContrasenaUsuarioId').val(userId);

    // Open the modal
    var myModal = new bootstrap.Modal(document.getElementById('modalCambiarContrasena'));
    myModal.show();
}

function guardarContrasena() {
    const form = document.getElementById('formCambiarContrasena');
    const userId = $('#cambiarContrasenaUsuarioId').val();
    const nuevaContrasena = $('#nuevaContrasena');
    const confirmarContrasena = $('#confirmarContrasena');
    const btnGuardar = $('#btnGuardarNuevaContrasena');

    // Resetear validaciones anteriores
    $(form).removeClass('was-validated');
    nuevaContrasena.removeClass('is-invalid');
    confirmarContrasena.removeClass('is-invalid');
    // Limpiar el mensaje de validación personalizado
    confirmarContrasena[0].setCustomValidity('');

    let isValid = true;

    // Validación de coincidencia de contraseñas
    if (nuevaContrasena.val() !== confirmarContrasena.val()) {
        confirmarContrasena.addClass('is-invalid');
        // Este mensaje se mostrará en el tooltip de validación del navegador si no hay un div `invalid-feedback`
        confirmarContrasena[0].setCustomValidity('Las contraseñas no coinciden.');
        isValid = false;
    }

    // Forzar la validación de Bootstrap y del navegador para campos con `required`, `minlength`, etc.
    if (form.checkValidity() === false) {
        isValid = false;
    }

    // Añadir clase para mostrar los mensajes de validación de Bootstrap
    $(form).addClass('was-validated');

    if (!isValid) {
        return; // Detener la ejecución si hay errores de validación
    }

    // Deshabilitar botón y mostrar spinner
    const originalButtonHtml = btnGuardar.html();
    btnGuardar.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Guardando...');

    // Llamada AJAX para actualizar la contraseña
    crearPeticion(urlAction, {
        case: 'cambiarContrasena',
        data: $.param({
            id: userId,
            contrasena: nuevaContrasena.val()
        })
    }, function (res) {
        // Restaurar botón
        btnGuardar.prop('disabled', false).html(originalButtonHtml);

        if (res.msg.es_valor_error) {
            mostrarMensajeError(res.msg.mensaje || "Error al cambiar la contraseña.");
        } else {
            mostrarMensajeOk("Contraseña actualizada correctamente.");
            const myModal = bootstrap.Modal.getInstance(document.getElementById('modalCambiarContrasena'));
            myModal.hide();
            // Resetear el formulario del modal para la próxima vez que se abra
            $(form).removeClass('was-validated');
            form.reset();
        }
    }, function () {
        // Función de error para la petición AJAX en caso de fallo de comunicación
        btnGuardar.prop('disabled', false).html(originalButtonHtml);
        mostrarMensajeError("Ocurrió un error de comunicación. Intente de nuevo.");
    });
}

function ready() {
    // Initialize the modal instance and store it
    if (!modalUsuario) {
        modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'));
    }

    // Initialize the form element and store it
    if (!formUsuario) {
        formUsuario = document.getElementById('formUsuario');
    }

    // Attach events to the modal ONCE
    $('#btnGuardarUsuario').off('click').on('click', function () {
        guardarUsuario();
    });

    $('#fotografia').off('change').on('change', function () {
        const archivo = this.files[0];
        if (archivo) previsualizarImagen(archivo);
    });

    $('#modalUsuario').off('hidden.bs.modal').on('hidden.bs.modal', function () {
        resetearFormulario();
    });

    // Evento para el switch de contraseña
    $('#generar_contrasena_auto').off('change').on('change', function () {
        const campoManual = $('#campo-contrasena-manual');
        const inputManual = $('#contrasena');

        if ($(this).is(':checked')) {
            // Auto-generar: ocultar, limpiar y deshabilitar campo manual
            campoManual.slideUp();
            inputManual.val('').prop('required', false).prop('disabled', true);
        } else {
            // Ingreso manual: mostrar y habilitar campo
            campoManual.slideDown();
            inputManual.prop('required', true).prop('disabled', false).focus();
        }
    }).trigger('change');

    crearPeticion(urlAction, { case: 'recuperarUsuarios' }, function (res) {
        if (res.msg.es_valor_error) {
            mostrarMensajeError("No se pudieron cargar los usuarios: " + res.mensaje, false);
        } else {
            permisosDisponibles = res.permisosUsuario || [];
            loadContacts(res.usuarios);
            loadPermisosUsuario(res.permisosUsuario);
            cargarRolesEnModal(permisosDisponibles); // Pre-load roles
            setEvents(); // Set up all page event handlers

            // Trigger click on the first user to select it by default
            if ($('.chat-user').length > 0) {
                $('.chat-user').first().trigger('click');
            }
        }
    });
}