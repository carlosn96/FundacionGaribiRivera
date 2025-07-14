<?php

include_once '../../includes/trabajoSocialTemplate.php';

renderizarPlantillaTrabajoSocial(__DIR__, [
    'api/FamiliaresManager.js',
    'api/ViviendaManager.js',
    'api/EstudioSocioeconomicoVer.js',
    'api/PhotoManager.js',
]);
