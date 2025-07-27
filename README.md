# Sistema de Gestión - Fundación Garibi Rivera

Este es el sistema de gestión interno de la Fundación Garibi Rivera. La aplicación está desarrollada en PHP y utiliza una arquitectura modular para organizar su funcionalidad.

## Estructura del Proyecto

El proyecto está organizado en varios directorios clave que separan las responsabilidades de la aplicación:

-   **/admin/**: Contiene las clases PHP que manejan la lógica de negocio y las operaciones administrativas. Cada archivo corresponde a un módulo específico del sistema (ej. `AdminEmprendedor.php`, `AdminTaller.php`).
-   **/controller/**: Gestiona las peticiones principales de la aplicación, como el manejo de sesiones (`Sesion.php`) y la interfaz para las peticiones AJAX (`API.php`).
-   **/dao/** (Data Access Object): Responsable de la interacción con la base de datos. Contiene la clase `Conexion.php` y un DAO para cada entidad del modelo (ej. `EmprendedorDAO.php`, `UsuarioDAO.php`).
-   **/model/**: Define las entidades del negocio, representando las estructuras de datos con las que opera la aplicación (ej. `Emprendedor.php`, `Taller.php`, `Usuario.php`).
-   **/public/**: Es el directorio raíz web. Contiene los archivos accesibles desde el navegador, como el `index.php` de cada módulo, y los assets (CSS, JavaScript, imágenes).
-   **index.php** (Raíz): Es el punto de entrada único para todas las peticiones del lado del servidor.

## Comunicación entre Módulos

La comunicación entre el frontend (cliente) y el backend (servidor) se realiza de manera centralizada a través de peticiones AJAX, gestionadas por una función específica.

### Frontend (Cliente)

Todos los módulos del sistema (`/public/*`) que necesitan comunicarse con el servidor utilizan la función `crearPeticion()`.

-   **Ubicación de la función**: `public/assets/js/util.js`
-   **Disponibilidad**: Este archivo `util.js` se incluye en todas las páginas de los módulos, por lo que la función `crearPeticion()` está globalmente disponible.

Esta función es un wrapper de `$.ajax` de jQuery que estandariza el envío de datos al servidor.

**Uso:**
```javascript
crearPeticion(modulo, accion, datos)
  .then(respuesta => {
    // Procesar la respuesta exitosa del servidor
  })
  .catch(error => {
    // Manejar el error
  });
```

### Backend (Servidor)

1.  La función `crearPeticion` envía una solicitud `POST` al archivo `API.php` ubicado en el directorio `/controller`.
2.  `API.php` actúa como un controlador principal que recibe el `modulo` y la `accion` especificados en la petición.
3.  Basándose en estos parámetros, `API.php` instancia la clase administrativa correspondiente (del directorio `/admin/`) y ejecuta el método solicitado.
4.  La clase de `admin` procesa la petición, interactuando con los `DAO` para acceder a la base de datos y con los `model` para estructurar la información.
5.  Finalmente, el servidor devuelve una respuesta en formato JSON al cliente, que es gestionada por la promesa (`.then` o `.catch`) de la función `crearPeticion`.

Este flujo asegura que toda la comunicación pase por un único punto de entrada (`API.php`), haciendo que el sistema sea más ordenado y fácil de mantener.
