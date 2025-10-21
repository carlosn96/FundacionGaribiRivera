var urlAction = "action/InicioAdministracionAPI.php";
var loadedContacts = []; // Global variable to hold transformed contacts

// This function creates the HTML for the list of users on the left.
function createChatUsersList(contacts) {
    const chatUsersHtml = contacts.map(contact => `
        <li>
            <a href="javascript:void(0)"
                class="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                id="chat_user_${contact.id}" data-user-id="${contact.id}">
                <span class="position-relative">
                    <img src="${contact.image}" alt="user" width="40"
                        height="40" class="rounded-circle">
                </span>
                <div class="ms-6 d-inline-block w-75">
                    <h6 class="mb-1 fw-semibold chat-title" data-username="${contact.name}">${contact.name}</h6>
                    <span class="fs-2 text-body-color d-block">${contact.email ? contact.email : ''}</span>
                </div>
            </a>
        </li>
    `).join('');
    return chatUsersHtml;
}

// This function creates the HTML for the detailed contact view on the right.
function createContactDetails(contact) {
    const chatListHtml = `
        <div class="chat-list chat" data-user-id="${contact.id}">
            <div class="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-3">
                    <img src="${contact.image}" alt="user"
                        width="72" height="72" class="rounded-circle">
                    <div>
                        <h6 class="fs-4 mb-0">${contact.name}</h6>
                        <p class="mb-0">${contact.role ? contact.role : ''}</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4 mb-7">
                    <p class="mb-1 fs-2">Phone number</p>
                    <h6 class="fw-semibold mb-0">${contact.phone ? contact.phone : ''}</h6>
                </div>
                <div class="col-8 mb-7">
                    <p class="mb-1 fs-2">Email address</p>
                    <h6 class="fw-semibold mb-0">${contact.email ? contact.email : ''}</h6>
                </div>
            </div>
            <div class="border-bottom pb-7 mb-4">
                <p class="mb-2 fs-2">Notes</p>
                <p class="mb-3 text-dark">
                    ${contact.notes ? contact.notes : ''}
                </p>
            </div>
            <div class="d-flex align-items-center gap-6">
                <button class="btn btn-primary">Edit</button>
                <button class="btn bg-danger-subtle text-danger">Delete</button>
            </div>
        </div>
    `;
    return chatListHtml;
}

// Renders a list of contacts to the UI
function renderContacts(contactsToRender) {
    if (contactsToRender && contactsToRender.length > 0) {
        // 1. Populate chat users list
        const chatUsersHtml = createChatUsersList(contactsToRender);
        $('.chat-users').html(chatUsersHtml);

        // 2. Populate all contact details views
        let allContactDetailsHtml = '';
        contactsToRender.forEach(contact => {
            allContactDetailsHtml += createContactDetails(contact);
        });
        $('.chat-box.email-box').html(allContactDetailsHtml);

        // 3. Set the first user as active by default
        $('.chat-user').first().addClass('bg-light-subtle');
        $('.chat-list.chat').first().addClass('active-chat');

    } else {
        $('.chat-users').empty();
        $('.chat-box.email-box').html('<p>No contacts found for this role.</p>');
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
            role: contact.tipo_usuario, // This is the role ID
            email: contact.correo_electronico
        };
    });

    loadedContacts = formattedContacts; // Store the full list globally
    renderContacts(loadedContacts); // Render the full list initially
}

// Loads the user roles/categories into the sidebar
function loadRolesUsuario(rolesUsuario) {
    const colors = ['primary', 'warning', 'success', 'danger', 'info'];
    let colorIndex = 0;

    let rolesHtml = '<li class="fw-semibold text-dark text-uppercase mx-9 my-2 px-3 fs-2">ROLES DE USUARIO</li>';

    if (rolesUsuario && typeof rolesUsuario === 'object') {
        for (const key in rolesUsuario) {
            if (Object.prototype.hasOwnProperty.call(rolesUsuario, key)) {
                const roleName = rolesUsuario[key];
                const color = colors[colorIndex % colors.length];
                rolesHtml += `
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1 role-filter-button"
                            href="javascript:void(0)" data-role-id="${key}">
                            <i class="ti ti-bookmark fs-5 text-${color}"></i>${roleName}
                        </a>
                    </li>
                `;
                colorIndex++;
            }
        }
    }

    // Populate both desktop and mobile containers
    $('#user-roles-container').html(rolesHtml);
    $('#user-roles-container-mobile').html(rolesHtml);
}

function setEvents() {
    // Event handler for clicking a user in the contact list
    $('.chat-users').on('click', '.chat-user', function () {
        var userId = $(this).data('user-id');
        $('.chat-user').removeClass('bg-light-subtle');
        $(this).addClass('bg-light-subtle');
        $('.chat-list.chat').removeClass('active-chat');
        $('.chat-list.chat[data-user-id=' + userId + ']').addClass('active-chat');
    });

    // Event handler for the role filter buttons
    // Use a general parent container for delegation
    $('body').on('click', '.role-filter-button', function() {
        const roleId = $(this).data('role-id');
        const filteredContacts = loadedContacts.filter(contact => contact.role == roleId);
        renderContacts(filteredContacts);
    });

    // Event handler for the "All Contacts" button
    $('body').on('click', '.all-contacts-btn', function() {
        renderContacts(loadedContacts);
    });
}

function ready() {
    crearPeticion(urlAction, { case: 'recuperarUsuarios' }, function (res) {
        if (res.msg.es_valor_error) {
            mostrarMensajeError("No se pudieron cargar los contactos: " + res.mensaje, false);
        } else {
            setEvents();
            loadContacts(res.usuarios);
            loadRolesUsuario(res.rolesUsuario);
        }
    });
};