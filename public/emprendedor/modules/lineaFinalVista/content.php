
<div class="card" id="contenido">
    <div class="card-body wizard-content">
        <h1 class="text-center mb-4">Línea Base Final</h1>

        <ul class="nav nav-tabs" id="dataTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">Información General</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="socioeconomico-tab" data-bs-toggle="tab" data-bs-target="#socioeconomico" type="button" role="tab" aria-controls="socioeconomico" aria-selected="false">Datos Socioeconómicos</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="negocio-tab" data-bs-toggle="tab" data-bs-target="#negocio" type="button" role="tab" aria-controls="negocio" aria-selected="false">Información del Negocio</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="analisis-tab" data-bs-toggle="tab" data-bs-target="#analisis" type="button" role="tab" aria-controls="analisis" aria-selected="false">Análisis del Negocio</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="ingresos-tab" data-bs-toggle="tab" data-bs-target="#ingresos" type="button" role="tab" aria-controls="ingresos" aria-selected="false">Administración de Ingresos</button>
            </li>
        </ul>

        <div class="tab-content" id="dataTabsContent">
            <!-- Información General 
            <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                <h4 class="mt-4">Información General</h4>
                <p><strong>Etapa:</strong> <span id="etapaNombre"></span> (<span id="etapaTipo"></span>)</p>
            </div>
            -->

            <!-- Datos Socioeconómicos -->
            <div class="tab-pane fade" id="socioeconomico" role="tabpanel" aria-labelledby="socioeconomico-tab">
                <p><strong>Ocupación actual:</strong> <span id="ocupacionActual"></span></p>
                <p><strong>Ingreso mensual:</strong> <span id="ingresoMensual"></span></p>
            </div>

            <!-- Información del Negocio -->
            <div class="tab-pane fade" id="negocio" role="tabpanel" aria-labelledby="negocio-tab">
                <div id="infoNegocio">
                    <p><strong>Nombre:</strong> <span id="nombreNegocio"></span></p>
                    <p><strong>Teléfono:</strong> <span id="telefonoNegocio"></span></p>
                    <p><strong>Dirección:</strong> <span id="direccionNegocio"></span></p>
                    <p><strong>Giro:</strong> <span id="giroNegocio"></span></p>
                    <p><strong>Actividad:</strong> <span id="actividadNegocio"></span></p>
                </div>
            </div>

            <!-- Análisis del Negocio -->
            <div class="tab-pane fade" id="analisis" role="tabpanel" aria-labelledby="analisis-tab">
                <div id="analisisNegocio">
                    <h4 class="mt-4">Análisis del Negocio</h4>
                    <p><strong>Problemas:</strong> <span id="problemasNegocio"></span></p>
                    <p><strong>Clientes:</strong> <span id="clientesNegocio"></span></p>
                    <p><strong>Ventajas:</strong> <span id="ventajasNegocio"></span></p>
                </div>
            </div>

            <!-- Administración de Ingresos -->
            <div class="tab-pane fade" id="ingresos" role="tabpanel" aria-labelledby="ingresos-tab">
                <p><strong>Ventas Mensuales:</strong> $<span id="ventasMensuales"></span></p>
                <p><strong>Gastos Mensuales:</strong> $<span id="gastosMensuales"></span></p>
                <p><strong>Utilidades Mensuales:</strong> $<span id="utilidadesMensuales"></span></p>
                <p><strong>Sueldo Mensual:</strong> $<span id="sueldoMensual"></span></p>
            </div>
        </div>
    </div>
</div>