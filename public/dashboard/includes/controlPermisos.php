<?php

//include_once __DIR__ . "/../../../../loader.php";

const dataPermisos = [
    TipoUsuario::ADMINISTRADOR_GENERAL => [
        "key" => "admin",
        "modal_target" => "#adminModal",
        "icon" => "fas fa-users-cog",
        "gradient" => "linear-gradient(135deg, var(--primary), #2a5f54)",
        "title" => "Administración General",
        "count" => "3 módulos",
        "description" => "Gestión de usuarios y comunicación interna del sistema",
    ],
    TipoUsuario::AUXILIAR_DIFUSION => [
        "key" => "difusion",
        "modal_target" => "#difusionModal",
        "icon" => "fas fa-bullhorn",
        "gradient" => "var(--success)",
        "title" => "Difusión",
        "count" => "7 módulos",
        "description" => "Gestión de talleres, etapas y registro de emprendedores",
    ],
    TipoUsuario::COORDINADOR_EMPRENDIMIENTO => [
        "key" => "emprendimiento",
        "modal_target" => "#emprendimientoModal",
        "icon" => "fas fa-lightbulb",
        "gradient" => "linear-gradient(135deg, var(--accent), #d4b534); color: var(--primary);",
        "title" => "Emprendimiento",
        "count" => "4 módulos",
        "description" => "Medición de impactos en créditos y capacitación",
    ],
    TipoUsuario::TRABABAJOR_SOCIAL => [
        "key" => "social",
        "modal_target" => "#socialModal",
        "icon" => "fas fa-people-carry",
        "gradient" => "var(--info)",
        "title" => "Trabajo Social",
        "count" => "3 módulos",
        "description" => "Seguimiento, estudios socioeconómicos y reportes",
    ],
    TipoUsuario::ENCARGADO_CREDITO_COBRANZA => [
        "key" => "credito",
        "modal_target" => "#creditoModal",
        "icon" => "fas fa-credit-card",
        "gradient" => "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "title" => "Crédito y cobranza",
        "count" => "1 módulo",
        "description" => "Gestión de créditos y cobranza.",
    ]
];

const ACCIONES_PRIORIDAD = [
    "Nuevo Emprendedor" => 1,
    "Ficha de Seguimiento" => 2,
    "Talleres" => 3,
    "Asistencia" => 4,
    "Estudio Socioeconómico" => 5,
    "Seguimiento a Graduados" => 6,
    "Cobranza" => 7,
    "Medición de Impacto: Capacitación" => 8,
    "Estadísticas" => 9,
    "Administración de usuarios" => 10,
    "Configuración de Parámetros (CONEVAL)" => 11,
    "Medición de Impacto: Crédito" => 12,
    "Historial de Emprendedores" => 13,
    "Etapas" => 14,
    "Instructores" => 15,
    "Administración de la Linea Base" => 16,
    "Información general" => 17,
    "Parámetros de Línea base" => 18,
];


function crearModuloPermiso($moduleData)
{
    $key = $moduleData['key'];
    $modal_target = $moduleData['modal_target'];
    $gradient = $moduleData['gradient'];
    $icon = $moduleData['icon'];
    $title = $moduleData['title'];
    $count = $moduleData['count'];
    $description = $moduleData['description'];

    return <<<HTML
    <div class="module-card" id="{$key}Card" data-bs-toggle="modal" data-bs-target="{$modal_target}">
        <div class="module-header">
            <div class="module-icon" style="background: {$gradient};"><i class="{$icon}"></i></div>
            <div>
                <div class="module-title">{$title}</div>
                <span class="module-count">{$count}</span>
            </div>
        </div>
        <p class="module-desc">{$description}</p>
        <a class="module-link"><span>Acceder</span><i class="fas fa-arrow-right"></i></a>
    </div>
HTML;
}

function renderizarModulosAcceso()
{
    $permisos = Sesion::obtenerUsuarioActual()["permisos"] ?? [];
    $html = "";
    foreach ($permisos as $permiso) {
        if(isset(dataPermisos[$permiso])){
             $html .= crearModuloPermiso(dataPermisos[$permiso]);
        }
    }
    return $html;
}

function obtenerAccesoPorTipoUsuario($tipoUsuario)
{
    switch ($tipoUsuario) {
        case TipoUsuario::ADMINISTRADOR_GENERAL:
            return [
                ["href" => "../../../administracionGeneral/", "icon" => "fa-user-plus", "text" => "Administración de usuarios"],
                ["href" => "#", "icon" => "fa-file-invoice", "text" => "Información general"],
                ["href" => "#", "icon" => "fa-tasks", "text" => "Parámetros de Línea base"],
            ];
        case TipoUsuario::AUXILIAR_DIFUSION:
            return [
                ["href" => "../../../difusion/modules/etapa/", "icon" => "fa-layer-group", "text" => "Etapas"],
                ["href" => "../../../difusion/modules/taller/", "icon" => "fa-chalkboard-teacher", "text" => "Talleres"],
                ["href" => "../../../difusion/modules/instructores/", "icon" => "fa-user-tie", "text" => "Instructores"],
                ["href" => "../../../difusion/modules/asistenciaTaller/", "icon" => "fa-clipboard-check", "text" => "Asistencia"],
                ["href" => "../../../difusion/modules/altaEmprendedores/", "icon" => "fa-user-plus", "text" => "Nuevo Emprendedor"],
                ["href" => "../../../difusion/modules/listadoGeneralEmprendedores/", "icon" => "fa-history", "text" => "Historial de Emprendedores"],
                ["href" => "../../../difusion/modules/lineaBaseAdministracion/", "icon" => "fa-tasks", "text" => "Administración de la Linea Base"],
            ];
        case TipoUsuario::COORDINADOR_EMPRENDIMIENTO:
            return [
                ["href" => "../../../emprendimiento/modules/historialEmprendedores/", "icon" => "fa-user-graduate", "text" => "Seguimiento a Graduados"],
                ["href" => "../../../emprendimiento/modules/medicionImpactosCapacitacion/", "icon" => "fa-chalkboard-teacher", "text" => "Medición de Impacto: Capacitación"],
                ["href" => "../../../emprendimiento/modules/medicionImpactosCredito/", "icon" => "fa-money-bill-wave", "text" => "Medición de Impacto: Crédito"],
                ["href" => "../../../emprendimiento/modules/estadisticas/", "icon" => "fa-chart-bar", "text" => "Estadísticas"],
                ["href" => "../../../emprendimiento/modules/historialEmprendedores/", "icon" => "fa-history", "text" => "Historial de Emprendedores"],
            ];
        case TipoUsuario::TRABABAJOR_SOCIAL:
            return [
                ["href" => "../../../trabajoSocial/modules/lineaBaseAdministracion/", "icon" => "fa-clipboard-check", "text" => "Ficha de Seguimiento"],
                ["href" => "../../../trabajoSocial/modules/estudioSocioeconomico/", "icon" => "fa-file-alt", "text" => "Estudio Socioeconómico"],
                ["href" => "../../../trabajoSocial/modules/configuracionConeval/", "icon" => "fa-cogs", "text" => "Configuración de Parámetros (CONEVAL)"],
            ];
        case TipoUsuario::ENCARGADO_CREDITO_COBRANZA:
            return [
                ["href" => "../../../cobranza/", "icon" => "fa-file-invoice-dollar", "text" => "Cobranza"],
            ];
        default:
            return [];
    }
}

function obtenerAccionesPriorizadas() {
    $permisos = Sesion::obtenerUsuarioActual()["permisos"] ?? [];
    $todasLasAcciones = [];
    foreach ($permisos as $permiso) {
        $accionesDePermiso = obtenerAccesoPorTipoUsuario($permiso);
        $todasLasAcciones = array_merge($todasLasAcciones, $accionesDePermiso);
    }

    if (empty($todasLasAcciones)) {
        return [];
    }

    $todasLasAcciones = array_map("unserialize", array_unique(array_map("serialize", $todasLasAcciones)));

    usort($todasLasAcciones, function ($a, $b) {
        $prioridadA = ACCIONES_PRIORIDAD[$a['text']] ?? 99;
        $prioridadB = ACCIONES_PRIORIDAD[$b['text']] ?? 99;
        return $prioridadA <=> $prioridadB;
    });

    return $todasLasAcciones;
}

function renderizarAccesosDirectos()
{
    $accionesPriorizadas = obtenerAccionesPriorizadas();
    $topAcciones = array_slice($accionesPriorizadas, 0, 3);

    if (empty($topAcciones)) {
        return "";
    }

    $html = "<div class=\"action-buttons\">\n";
    $isFirst = true;

    foreach ($topAcciones as $acceso) {
        $class = $isFirst ? "btn-primary-action" : "btn-secondary-action";
        $html .= "<a href=\"{$acceso['href']}\" class=\"btn btn-action {$class}\">\n";
        $html .= "<i class=\"fas {$acceso['icon']}\"></i>{$acceso['text']}\n";
        $html .= "</a>\n";
        $isFirst = false;
    }

    $html .= "</div>";
    return $html;
}

function renderizarCajaAccesosDirectos() {
    $accesosDirectosHtml = renderizarAccesosDirectos();

    if (empty($accesosDirectosHtml)) {
        return;
    }

    echo <<<HTML
    <div class="row g-3">
        <div class="col">
            <div class="sidebar-box"
                style="background: linear-gradient(135deg, var(--primary) 0%, #2a5f54 100%); border: none;">
                <h5 class="sidebar-title text-white" style="color: white !important;">
                    <i class="fas fa-bolt me-2"></i>Accesos Directos
                </h5>
                <p class="text-white-50 mb-3">Realiza acciones comunes con un click</p>
                {$accesosDirectosHtml}
            </div>
        </div>
    </div>
HTML;
}

function renderizarAccionPrincipal() {
    $accionesPriorizadas = obtenerAccionesPriorizadas();

    if (empty($accionesPriorizadas)) {
        return;
    }

    $accionPrincipal = $accionesPriorizadas[0];

    $icon = ($accionPrincipal['text'] === 'Nuevo Emprendedor') ? 'fa-plus' : $accionPrincipal['icon'];

    echo <<<HTML
    <div class="col-md-4 text-md-end mt-3 mt-md-0">
        <a href="{$accionPrincipal['href']}" class="btn btn-action btn-primary-action" style="width: 100%;">
            <i class="fas {$icon}"></i>{$accionPrincipal['text']}
        </a>
    </div>
HTML;
}
