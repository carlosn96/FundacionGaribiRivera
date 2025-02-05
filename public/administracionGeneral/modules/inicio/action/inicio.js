var urlAction = "action/InicioAdministracionAPI.php";

// Función para inicializar todo cuando la página está lista
function ready() {
    // Recuperar usuarios y crear los contactos
    crearPeticion(urlAction, {"case": "recuperarUsuarios"}, function (res) {
        const contacts = getContacts();
        contacts.forEach(function (contacto, idx) {
            createContact(contacto, idx === 0); // Crear contacto y marcar el primero como activo
        });
        ajustarEventos(); // Aplicamos eventos después de que se cargan los contactos
    });
}

// Función para crear un nuevo contacto en la lista de contactos
function createContact(contact, esActivo = false) {
    var contactElement = document.createElement('li');
    contactElement.classList.add('px-4', 'py-3', 'bg-hover-light-black', 'd-flex', 'align-items-center', 'chat-user');
    if (esActivo) contactElement.classList.add('bg-light-subtle');  // Si es activo, añadir la clase de fondo
    contactElement.setAttribute('id', 'chat_user_' + contact.id);
    contactElement.setAttribute('data-user-id', contact.id);

    // Crear el enlace <a> dentro del <li>
    var contactLink = document.createElement('a');
    contactLink.setAttribute('href', 'javascript:void(0)');
    contactLink.classList.add('d-flex', 'align-items-center');

    var imgWrapper = document.createElement('span');
    imgWrapper.classList.add('position-relative');
    var userImage = document.createElement('img');
    userImage.setAttribute('src', contact.image);
    userImage.setAttribute('alt', 'user-' + contact.id);
    userImage.setAttribute('width', '40');
    userImage.setAttribute('height', '40');
    userImage.classList.add('rounded-circle');
    imgWrapper.appendChild(userImage);

    var userInfo = document.createElement('div');
    userInfo.classList.add('ms-6', 'd-inline-block', 'w-75');
    var nameElement = document.createElement('h6');
    nameElement.classList.add('mb-1', 'fw-semibold', 'chat-title');
    nameElement.textContent = contact.name;
    var emailElement = document.createElement('span');
    emailElement.classList.add('fs-2', 'text-body-color', 'd-block');
    emailElement.textContent = contact.email;
    userInfo.appendChild(nameElement);
    userInfo.appendChild(emailElement);

    contactLink.appendChild(imgWrapper);
    contactLink.appendChild(userInfo);

    contactElement.appendChild(contactLink);
    document.getElementById('listaContactos').appendChild(contactElement);
}

// Función para ajustar los eventos una vez que los contactos están creados
function ajustarEventos() {
    // Delegación de eventos para la búsqueda en los contactos
    $(".search-chat").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".chat-users").find("li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // Delegación de eventos para el clic en un contacto (se agrega dinámicamente)
    $(".user-chat-box").on("click", ".chat-user", function (event) {
        // Verificamos si ya está seleccionado
        if ($(this).hasClass("active")) {
            return false; // Si ya está activo, no hacer nada
        } else {
            var findChat = $(this).attr("data-user-id");
            var personName = $(this).find(".chat-title").text();
            var personImage = $(this).find("img").attr("src");

            // Mostrar/ocultar los contenidos adecuados
            var hideTheNonSelectedContent = $(this)
                .parents(".chat-application")
                .find(".chat-not-selected")
                .hide()
                .siblings(".chatting-box")
                .show();
            var showChatInnerContent = $(this)
                .parents(".chat-application")
                .find(".chat-container .chat-box-inner-part")
                .show();

            // Manejar el tamaño de la pantalla para el nombre
            if (window.innerWidth <= 767) {
                $(".chat-container .current-chat-user-name .name").html(personName.split(" ")[0]);
            } else if (window.innerWidth > 767) {
                $(".chat-container .current-chat-user-name .name").html(personName);
            }
            $(".chat-container .current-chat-user-name img").attr("src", personImage);

            // Desmarcar al contacto previamente seleccionado (si existe)
            $(".chat").removeClass("active-chat");
            $(".user-chat-box .chat-user").removeClass("bg-light-subtle");

            // Marcar el contacto actual como seleccionado
            $(this).addClass("bg-light-subtle");
            $(".chat[data-user-id = " + findChat + "]").addClass("active-chat");
        }

        // Si el chat está en una lista de usuarios y se hace clic, se cierra el menú
        if ($(this).parents(".user-chat-box").hasClass("user-list-box-show")) {
            $(this).parents(".user-chat-box").removeClass("user-list-box-show");
        }

        // Activar las secciones de chat
        $(".chat-meta-user").addClass("chat-active");
        $(".chat-send-message-footer").addClass("chat-active");
    });

    // ** Agregar evento al botón "Regresar" **
    $(".back-btn").click(function () {
        // Aseguramos de que al regresar, la lista de contactos sea visible
        $(".app-email-chatting-box").hide();
        $(".user-chat-box").show();  // Mostrar la lista de contactos
    });

    // Toggle para el menú de chat
    $("body").on("click", ".chat-menu", function () {
        $(".parent-chat-box").toggleClass("app-chat-right");
        $(this).toggleClass("app-chat-active");
    });
}


function getContacts() {
    return [
        {
            id: 2,
            name: 'Jonathan Higgins',
            image: '../../../assets/images/profile/user-1.jpg',
            email: 'jonathan_hig@modernize.com',
            role: 'Product Manager',
            company: 'Tech Innovations LLC',
            phone: '+1 (203) 9876',
            address: '145, Green Park, Central Avenue',
            city: 'Los Angeles',
            country: 'United States',
            notes: 'Jonathan is responsible for overseeing product development and innovation.',
            additionalNotes: 'He loves working on new technologies and is an advocate for sustainability.'
        },
        {
            id: 3,
            name: 'Sophia Adams',
            image: '../../../assets/images/profile/user-2.jpg',
            email: 'sophia.adams@techcorp.com',
            role: 'Marketing Specialist',
            company: 'TechCorp',
            phone: '+1 (415) 6543',
            address: '2000, Skyline Blvd, Suite 210',
            city: 'San Francisco',
            country: 'United States',
            notes: 'Sophia specializes in digital marketing and social media strategies.',
            additionalNotes: 'She is always looking for creative ways to engage customers and build brand awareness.'
        },
        
    ];
}
