<div class="card" id="content">
    <div class="card-body">
        <h4 class="card-title">Linea Base</h4>
        <p class="mb-3 card-subtitle">Información proporcionada</p>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link d-flex active" data-bs-toggle="tab" href="#preliminar" role="tab" aria-selected="true">
                    <span>
                        <i class="ti ti-home-2 fs-4"></i>
                    </span>
                    <span class="d-none d-md-block ms-2">Preliminar</span>
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link d-flex" data-bs-toggle="tab" href="#identificacion" role="tab" aria-selected="false">
                    <span>
                        <i class="ti ti-user fs-4"></i>
                    </span>
                    <span class="d-none d-md-block ms-2">Identificación</span>
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link d-flex" data-bs-toggle="tab" href="#domicilio" role="tab" aria-selected="false">
                    <span>
                        <i class="ti ti-map-2 fs-4"></i>
                    </span>
                    <span class="d-none d-md-block ms-2">Domicilio</span>
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link d-flex" data-bs-toggle="tab" href="#socioeconomico" role="tab" aria-selected="false">
                    <span>
                        <i class="ti ti-wallet fs-4"></i>
                    </span>
                    <span class="d-none d-md-block ms-2">Socioeconómico</span>
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link d-flex" data-bs-toggle="tab" href="#negocio" role="tab" aria-selected="false">
                    <span>
                        <i class="ti ti-home-dollar"></i>
                    </span>
                    <span class="d-none d-md-block ms-2">Negocio</span>
                </a>
            </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <div class="tab-pane active show p-3" id="preliminar" role="tabpanel">
                <hr class="m-0">
                <div class="card-body">
                    <h5 class="card-title mb-0">Información preliminar</h5>
                </div>
                <hr class="m-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">¿Cómo te enteraste de la Fundación?</label>
                                <div class="col-md-7">
                                    <p><span id="preliminar-listaMedioConoceFundacion"></span></p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Tiempo para capacitarte:</label>
                                <div class="col-md-7">
                                    <p><span id="preliminar-tiempoDedicaCapacitacion-descripcion"></span></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Recurres a la Fundación para solicitar:</label>
                                <div class="col-md-7">
                                    <p><span id="preliminar-razonRecurreFundacion-descripcion"></span></p>
                                    <p><span id="preliminar-otraRazonRecurreFundacion"></span></p>
                                    <p><span id="preliminar-solicitaCredito-descripcion"></span></p>
                                    <p><span id="preliminar-utilizaCredito-descripcion"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane p-3" id="identificacion" role="tabpanel">
                <hr class="m-0">
                <div class="card-body">
                    <h5 class="card-title mb-0">Identificación</h5>
                </div>
                <hr class="m-0">
                <div class="card-body">
                    <!--/row-->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Género:</label>
                                <div class="col-md-7">
                                    <p><span id="identificacion-genero"></span></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Edad:</label>
                                <div class="col-md-7">
                                    <p><span id="identificacion-edad"></span> años</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Estado civil:</label>
                                <div class="col-md-7">
                                    <p><span id="identificacion-estadoCivil-descripcion"></span></p>
                                </div>
                            </div>
                        </div>
                        <!--/span-->
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Escolaridad:</label>
                                <div class="col-md-7">
                                    <p><span id="identificacion-escolaridad-descripcion"></span></p>
                                </div>
                            </div>
                        </div>
                        <!--/span-->
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">¿Presenta alguna discapacidad?</label>
                                <div class="col-md-7">
                                    <p><span id="identificacion-discapacidad"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane p-3" id="domicilio" role="tabpanel">
                <hr class="m-0">
                <div class="card-body">
                    <h3 class="card-title mb-0">Domicilio</h3>
                </div>
                <hr class="m-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Dirección:</label>
                                <div class="col-md-7">
                                    <p>Calle <strong><span id="domicilio-calle"></span></strong>, No. <strong><span id="domicilio-numeroExterior"></span></strong> 
                                        <strong><span id="domicilio-numeroInterior"></span></strong>. 
                                        Entre <strong><span id="domicilio-calleCruce1"></span></strong> 
                                        y <strong><span id="domicilio-calleCruce2"></span></strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Localidad:</label>
                                <div class="col-md-7">
                                    <p><span id="domicilio-codigoPostal-colonia"></span>, 
                                        <span id="domicilio-municipio-nombre"></span>,
                                        <span id="domicilio-estado"></span>. C.P. <span id="domicilio-codigoPostal-codigo"></span> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--/row-->
                    <div class="row">
                        <!--/span-->
                        <div class="col-md-7">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Comunidad Parroquial:</label>
                                <div class="col-md-7">
                                    <p><span id="domicilio-comunidadParroquial-nombre"></span></p>
                                    <p>Decanato: <span id="domicilio-comunidadParroquial-decanato"></span></p>
                                    <p>Vicaria: <span id="domicilio-comunidadParroquial-vicaria"></span></p>
                                </div>
                            </div>
                        </div>
                        <!--/span-->
                    </div>
                </div>
            </div>
            <div class="tab-pane p-3" id="socioeconomico" role="tabpanel">  
                <hr class="m-0">
                <div class="card-body">
                    <h5 class="card-title mb-0">Socioeconómico</h5>
                </div>
                <hr class="m-0">
                <div class="card-body">
                    <!--/row-->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Cantidad dependientes:</label>
                                <div class="col-md-7">
                                    <p><span id="socioeconomico-cantidadDependientes"></span></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Ocupación Actual:</label>
                                <div class="col-md-7">
                                    <p><span id="socioeconomico-ocupacionActual-descripcion"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="form-label text-end col-md-5">Ingreso Mensual:</label>
                                <div class="col-md-7">
                                    <p><span id="socioeconomico-ingresoMensual-descripcion"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane p-3" id="negocio" role="tabpanel">
                <div id="infoNegocio">
                    <hr class="m-0">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <h5 class="card-title  col-md-6 mb-0">Negocio: </h5>
                            <span id="negocio-nombre"></span>
                        </div>
                        <div class="row align-items-center">
                            <label class="form-label col-md-6 col-form-label">Teléfono:</label>
                            <span id="negocio-telefono"></span>
                        </div>
                    </div>
                    <hr class="m-0">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Dirección:</label>
                                    <div class="col-md-7">
                                        <p>Calle <strong><span id="negocio-calle"></span></strong>, No. <strong><span id="negocio-numExterior"></span></strong>
                                            <strong><span id="negocio-numeroInterior"></span></strong>, 
                                            Entre <strong><span id="negocio-calleCruce1"></span></strong> 
                                            y <strong><span id="negocio-calleCruce2"></span></strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Localidad:</label>
                                    <div class="col-md-7">
                                        <p><span id="negocio-codigoPostal-colonia"></span>, 
                                            <span id="negocio-municipio-nombre"></span>,
                                            <span id="negocio-estado-nombre"></span>. C.P. <span id="negocio-codigoPostal-codigo"></span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Antigüedad:</label>
                                    <div class="col-md-7">
                                        <p><span id="negocio-antiguedad"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Cantidad de empleados:</label>
                                    <div class="col-md-7">
                                        <p><span id="negocio-cantEmpleados"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Giro:</label>
                                    <div class="col-md-7">
                                        <p><span id="negocio-giro-descripcion"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Principal actividad:</label>
                                    <div class="col-md-7">
                                        <p><span id="negocio-actividadPrincipal"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="m-0">
                    <div class="card-body">
                        <h5 class="card-title mb-0">Análisis de Negocio</h5>
                    </div>
                    <hr class="m-0">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">¿Cómo emplea las ganancias generadas?</label>
                                    <div class="col-md-7">
                                        <span id="analisisNegocio-listaEmpleoGanancias"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Estrategias para incrementar las ventas:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-listaEstrategiaVentas"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Problemas del negocio:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-problemasNegocio"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Registra entradas y salidas:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-registraEntradaSalida"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Asigna sueldo:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-asignaSueldo"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Competencia:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-competencia"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Clientes del negocio:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-clientesNegocio"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Ventajas del negocio:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-ventajasNegocio"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Conoce Utilidades:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-conoceUtilidades"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Porcentaje de productos con mayor utilidad:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-porcentajeProductosMayorUtilidad"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Asigna ahorro:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-ahorro"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Conoce Punto de Equilibrio:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-conocePuntoEquilibrio"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Separa gastos:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-separaGastos"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="form-label text-end col-md-5">Elabora presupuesto mensual:</label>
                                    <div class="col-md-7">
                                        <p><span id="analisisNegocio-elaboraPresupuesto"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="msgNoNegocio" hidden="">
                    <div class="alert alert-warning text-warning alert-dismissible fade show" role="alert">
                        <strong>Sin información del negocio</strong>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>



