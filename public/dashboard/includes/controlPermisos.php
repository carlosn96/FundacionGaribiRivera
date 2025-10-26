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

/**
 * Crea el código HTML para una tarjeta de módulo de acceso.
 * Esta función no valida permisos, solo genera el HTML.
 *
 * @param array $moduleData Array con la información del módulo.
 */
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
            <div class="module-icon" style="background: {$gradient};">
                <i class="{$icon}"></i>
            </div>
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

function renderizarPermisos() {
    $permisos = Sesion::obtenerUsuarioActual()["permisos"];
    $html = "";
    foreach ($permisos as $permiso) {
        $html .= crearModuloPermiso(dataPermisos[$permiso]);
    }
    return $html;
}

