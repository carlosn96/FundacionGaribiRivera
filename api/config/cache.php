<?php

return [

    'default' => env('CACHE_DRIVER', 'file'),

    'stores' => [

        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],

        // Otros drivers disponibles: memcached, array, database, etc.
    ],

    'prefix' => env('CACHE_PREFIX', 'lumen_cache'),
];
