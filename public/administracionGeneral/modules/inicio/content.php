<div class="container-fluid">
    <div class="card overflow-hidden chat-application">
        <div class="d-flex align-items-center justify-content-between gap-6 m-3 d-lg-none">
            <button class="btn btn-primary d-flex" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#chat-sidebar" aria-controls="chat-sidebar">
                <i class="ti ti-menu-2 fs-5"></i>
            </button>
            <form class="position-relative w-100">
                <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh"
                    placeholder="Search Contact">
                <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
            </form>
        </div>
        <div class="d-flex w-100">
            <div class="left-part border-end w-20 flex-shrink-0 d-none d-lg-block">
                <div class="px-9 pt-4 pb-3">
                    <button class="btn btn-primary fw-semibold py-8 w-100">Add New Contact</button>
                </div>
                <ul class="list-group mh-n100" data-simplebar>
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1 all-contacts-btn"
                            href="javascript:void(0)">
                            <i class="ti ti-inbox fs-5"></i>All Contacts
                        </a>
                    </li>
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                            href="javascript:void(0)">
                            <i class="ti ti-star"></i>Starred
                        </a>
                    </li>
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                            href="javascript:void(0)">
                            <i class="ti ti-file-text fs-5"></i>Pending
                        </a>
                    </li>
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                            href="javascript:void(0)">
                            <i class="ti ti-alert-circle"></i>Blocked
                        </a>
                    </li>
                    <li class="border-bottom my-3"></li>
                    <div id="user-roles-container"></div>
                </ul>
            </div>
            <div class="d-flex w-100">
                <div class="min-width-340">
                    <div class="border-end user-chat-box h-100">
                        <div class="px-4 pt-9 pb-6 d-none d-lg-block">
                            <form class="position-relative">
                                <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh"
                                    placeholder="Search" />
                                <i
                                    class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
                            </form>
                        </div>
                        <div class="app-chat">
                            <ul class="chat-users mh-n100" data-simplebar>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="w-100">
                    <div class="chat-container h-100 w-100">
                        <div class="chat-box-inner-part h-100">
                            <div class="chatting-box app-email-chatting-box">
                                <div
                                    class="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                                    <h5 class="text-dark mb-0 fs-5">Contact Details</h5>
                                    <ul class="list-unstyled mb-0 d-flex align-items-center">
                                        <li class="d-lg-none d-block">
                                            <a class="text-dark back-btn px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                                href="javascript:void(0)">
                                                <i class="ti ti-arrow-left"></i>
                                            </a>
                                        </li>
                                        <li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top"
                                            data-bs-title="important">
                                            <a class="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                                href="javascript:void(0)">
                                                <i class="ti ti-star"></i>
                                            </a>
                                        </li>
                                        <li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top"
                                            data-bs-title="Edit">
                                            <a class="d-block text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                                href="javascript:void(0)">
                                                <i class="ti ti-pencil"></i>
                                            </a>
                                        </li>
                                        <li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top"
                                            data-bs-title="Delete">
                                            <a class="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                                href="javascript:void(0)">
                                                <i class="ti ti-trash"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="position-relative overflow-hidden">
                                    <div class="position-relative">
                                        <div class="chat-box email-box mh-n100 p-9" data-simplebar="init">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="offcanvas offcanvas-start user-chat-box" tabindex="-1" id="chat-sidebar"
                aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel"> Contact </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="px-9 pt-4 pb-3">
                    <button class="btn btn-primary fw-semibold py-8 w-100">Add New Contact</button>
                </div>
                <ul class="list-group h-n150" data-simplebar>
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1 all-contacts-btn"
                            href="javascript:void(0)">
                            <i class="ti ti-inbox fs-5"></i>All Contacts
                        </a>
                    </li>
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                            href="javascript:void(0)">
                            <i class="ti ti-star"></i>Starred
                        </a>
                    </li>
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                            href="javascript:void(0)">
                            <i class="ti ti-file-text fs-5"></i>Pening Approval
                        </a>
                    </li>
                    <li class="list-group-item border-0 p-0 mx-9">
                        <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                            href="javascript:void(0)">
                            <i class="ti ti-alert-circle"></i>Blocked
                        </a>
                    </li>
                    <li class="border-bottom my-3"></li>
                    <div id="user-roles-container"></div>
                </ul>
            </div>
        </div>
    </div>
</div>