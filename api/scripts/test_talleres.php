<?php

// Script de prueba para ejecutar los métodos de TallerController
// Uso: php api/scripts/test_talleres.php <idEtapa>

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Http\Controllers\TallerController;
use Illuminate\Http\JsonResponse;

$idEtapa = $argv[1] ?? null;
use Illuminate\Support\Facades\Facade;
use Illuminate\Database\Eloquent\Model;

if (!$idEtapa) {
    echo "Uso: php test_talleres.php <idEtapa>\n";
    exit(1);
}

$controller = $app->make(TallerController::class);

try {
    echo "=== getTalleresPorEtapa (Eloquent + Recursos) ===\n"; 
    // Inicializar facades y Eloquent para uso CLI
    Facade::setFacadeApplication($app);
    // bind de la resolución de conexiones y dispatcher de eventos para Eloquent
    if ($app->bound('db')) {
        Model::setConnectionResolver($app['db']);
    }
    if ($app->bound('events')) {
        Model::setEventDispatcher($app['events']);
    }
    $res1 = $controller->getTalleresPorEtapa($idEtapa);
    if ($res1 instanceof JsonResponse) {
        echo $res1->getContent() . "\n";
    } else {
        // Fallback
        echo json_encode($res1) . "\n";
    }
} catch (Throwable $e) {
    echo "Error en getTalleresPorEtapa: " . $e->getMessage() . "\n";
}

try {
    echo "\n=== getTalleresPorEtapaDos (Cronograma raw SQL) ===\n";
    $res2 = $controller->getTalleresPorEtapaDos($idEtapa);
    if (is_object($res2) && method_exists($res2, 'getContent')) {
        echo $res2->getContent() . "\n";
    } elseif (is_string($res2)) {
        echo $res2 . "\n";
    } else {
        // Last resort: var_dump
        var_dump($res2);
    }
} catch (Throwable $e) {
    echo "Error en getTalleresPorEtapaDos: " . $e->getMessage() . "\n";
}

echo "\nScript finalizado.\n";
