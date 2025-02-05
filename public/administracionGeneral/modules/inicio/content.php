<div class="content">
    <!-- Card para la lista de usuarios -->
    <div class="card shadow-sm border-1">
        <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <div>
                <h4 class="card-title">Lista de usuarios disponibles</h4>
                <p class="card-subtitle mb-3">Gestión de usuarios registrados en el sistema</p>
            </div>
            <!-- Botón "Nuevo Usuario" en la esquina superior derecha -->
            <a href="../perfil/" class="btn btn-outline-primary btn-round">
                <span class="btn-label">
                    <i class="fas fa-user-plus"></i>
                </span>
                Nuevo usuario
            </a>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover" id="tablaUsuarios">
                    <thead class="table-info">
                        <tr>
                            <th class="text-center">Nombre del Usuario</th>
                            <th class="text-center">Correo electrónico</th>
                            <th class="text-center">Rol de usuario</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="bodyTablaUsuarios" class="text-center">
                        <!-- Contenido dinámico de los usuarios se agregará aquí -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="card overflow-hidden chat-application">
    <div class="d-flex align-items-center justify-content-between gap-6 m-3 d-lg-none">
        <button class="btn btn-primary d-flex" type="button" data-bs-toggle="offcanvas" data-bs-target="#chat-sidebar" aria-controls="chat-sidebar">
            <i class="ti ti-menu-2 fs-5"></i>
        </button>
        <form class="position-relative w-100">
            <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Contact">
            <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
        </form>
    </div>
    <div class="d-flex w-100">
        <div class="min-width-340">
            <div class="border-end user-chat-box h-100">
                <div class="px-4 pt-9 pb-6 d-none d-lg-block">
                    <form class="position-relative">
                        <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search" />
                        <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
                    </form>
                </div>
                <div class="app-chat">
                    <ul class="chat-users mh-n100" data-simplebar id="listaContactos">
                        <li>
                            <a href="javascript:void(0)" class="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user bg-light-subtle" id="chat_user_1" data-user-id="1">
                                <span class="position-relative">
                                    <img src="../../../assets/images/profile/user-3.jpg" alt="user-4" width="40" height="40" class="rounded-circle">
                                </span>
                                <div class="ms-6 d-inline-block w-75">
                                    <h6 class="mb-1 fw-semibold chat-title" data-username="James Anderson">Dr. Bonnie Barstow
                                    </h6>
                                    <span class="fs-2 text-body-color d-block">barstow@ modernize.com</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-100">
            <div class="chat-container h-100 w-100">
                <div class="chat-box-inner-part h-100">
                    <div class="chatting-box app-email-chatting-box">
                        <div class="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                            <h5 class="text-dark mb-0 fs-5">Contact Details</h5>
                            <ul class="list-unstyled mb-0 d-flex align-items-center">
                                <li class="d-lg-none d-block">
                                    <a class="text-dark back-btn px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)">
                                        <i class="ti ti-arrow-left"></i>
                                    </a>
                                </li>
                                <li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">
                                    <a class="d-block text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)">
                                        <i class="ti ti-pencil"></i>
                                    </a>
                                </li>
                                <li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">
                                    <a class="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)">
                                        <i class="ti ti-trash"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="position-relative overflow-hidden">
                            <div class="position-relative">
                                <div class="chat-box email-box mh-n100 p-9" data-simplebar="init" id="listaContactosDetails">
                                    <div class="chat-list chat active-chat" data-user-id="1">
                                        <div class="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div class="d-flex align-items-center gap-3">
                                                <img src="../../../assets/images/profile/user-3.jpg" alt="user4" width="72" height="72" class="rounded-circle">
                                                <div>
                                                    <h6 class="fs-4 mb-0">Dr. Bonnie Barstow </h6>
                                                    <p class="mb-0">Sales Manager</p>
                                                    <p class="mb-0">Digital Arc Pvt. Ltd.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 mb-7">
                                                <p class="mb-1 fs-2">Phone number</p>
                                                <h6 class="fw-semibold mb-0">+1 (203) 3458</h6>
                                            </div>
                                            <div class="col-8 mb-7">
                                                <p class="mb-1 fs-2">Email address</p>
                                                <h6 class="fw-semibold mb-0">alexandra@modernize.com</h6>
                                            </div>
                                            <div class="col-12 mb-9">
                                                <p class="mb-1 fs-2">Address</p>
                                                <h6 class="fw-semibold mb-0">312, Imperical Arc, New western corner</h6>
                                            </div>
                                            <div class="col-4 mb-7">
                                                <p class="mb-1 fs-2">City</p>
                                                <h6 class="fw-semibold mb-0">New York</h6>
                                            </div>
                                            <div class="col-8 mb-7">
                                                <p class="mb-1 fs-2">Country</p>
                                                <h6 class="fw-semibold mb-0">United Stats</h6>
                                            </div>
                                        </div>
                                        <div class="border-bottom pb-7 mb-4">
                                            <p class="mb-2 fs-2">Notes</p>
                                            <p class="mb-3 text-dark">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum
                                                hendrerit lobortis. Nullam ut lacus eros. Sed at luctus urna, eu fermentum
                                                diam.
                                                In et tristique mauris.
                                            </p>
                                            <p class="mb-0 text-dark">Ut id ornare metus, sed auctor enim. Pellentesque
                                                nisi magna, laoreet a augue eget, tempor volutpat diam.</p>
                                        </div>
                                        <div class="d-flex align-items-center gap-6">
                                            <button class="btn btn-primary" fdprocessedid="pk6kl8">Edit</button>
                                            <button class="btn bg-danger-subtle text-danger" fdprocessedid="83zpb">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>