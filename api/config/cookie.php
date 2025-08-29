<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Cookie Path
    |--------------------------------------------------------------------------
    |
    | The default path for which the cookie will be regarded as available.
    |
    */

    'path' => '/',

    /*
    |--------------------------------------------------------------------------
    | Default Cookie Domain
    |--------------------------------------------------------------------------
    |
    | The default domain that the cookie is available to.
    |
    */

    'domain' => env('COOKIE_DOMAIN', null),

    /*
    |--------------------------------------------------------------------------
    | HTTPS Only Cookies
    |--------------------------------------------------------------------------
    |
    | Indicates that the cookie should only be transmitted over a secure
    | HTTPS connection from the client.
    |
    */

    'secure' => env('COOKIE_SECURE', false),

    /*
    |--------------------------------------------------------------------------
    | HTTP Access Only
    |--------------------------------------------------------------------------
    |
    | When true, the cookie will be made accessible only through the HTTP
    | protocol.
    |
    */

    'http_only' => true,

    /*
    |--------------------------------------------------------------------------
    | Same-Site Cookies
    |--------------------------------------------------------------------------
    |
    | This option determines how your cookies behave when cross-site requests
    | take place, and can be used to mitigate CSRF attacks. By default, we
    | will set this value to "lax" since this is a secure default value.
    |
    | Supported: "lax", "strict", "none", null
    |
    */

    'same_site' => 'lax',

];
