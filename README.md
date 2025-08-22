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
const url = 'controller/API.php'; // URL del punto de acceso principal
const datos = {
  case: 'nombreDeLaAccion',
  parametro1: 'valor1'
  // Otros datos necesarios
};

crearPeticion(url, datos, function(respuesta) {
  // Procesar la respuesta exitosa del servidor.
  console.log(respuesta);
});
```

**Parámetros:**

*   `url` (String): La URL del script de PHP que funciona como API.
*   `data` (Object | FormData): Un objeto JSON o un objeto `FormData` para enviar. Este objeto debe contener una propiedad `case` que indica la acción a realizar en el backend.
*   `fnSuccess` (Function): La función callback que se ejecuta si la petición tiene éxito. Recibe la respuesta del servidor como su único argumento.
*   `fnError` (Function, Opcional): La función callback que se ejecuta si ocurre un error. Por defecto, procesa el error y muestra un mensaje al usuario.

### Backend (Servidor)

1.  La función `crearPeticion` envía una solicitud `POST` a la URL especificada, que generalmente es `controller/API.php`.
2.  `API.php` actúa como un controlador principal que recibe los datos y busca un parámetro `case` dentro de ellos.
3.  Basándose en el valor del `case`, `API.php` determina qué clase administrativa (del directorio `/admin/`) debe instanciar y qué método debe ejecutar para manejar la solicitud.
4.  La clase de `admin` procesa la petición, interactuando con los `DAO` para acceder a la base de datos y con los `model` para estructurar la información.
5.  Finalmente, el servidor devuelve una respuesta en formato JSON al cliente, que es gestionada por la función `callback` (`fnSuccess` o `fnError`) pasada a `crearPeticion`.

Este flujo asegura que toda la comunicación pase por un único punto de entrada (`API.php`), haciendo que el sistema sea más ordenado y fácil de mantener.


### Directorios Principales

- **/ (Raíz):** Contiene archivos de configuración y el punto de entrada principal de la aplicación.
- **/admin/:** Clases PHP para la lógica de negocio y operaciones administrativas.
- **/controller/:** Controladores para gestionar peticiones y sesiones.
- **/dao/:** Objetos de Acceso a Datos para la interacción con la base de datos.
- **/model/:** Entidades del negocio y estructuras de datos.
- **/public/:** Directorio raíz web, con los archivos accesibles desde el navegador.

### Módulos en /public/

El directorio `/public/` está organizado en los siguientes módulos, cada uno con su propia funcionalidad y estructura interna:

- **/administracionGeneral/:** Módulo para la administración general del sistema.
- **/emprendedor/:** Módulo para la gestión de emprendedores.
- **/index/:** Módulo principal de la aplicación, con la página de inicio y el formulario de login.
- **/proyectos/:** Módulo para la gestión de proyectos.
- **/trabajoSocial/:** Módulo para el área de trabajo social.

Cada uno de estos módulos sigue una estructura similar:

- **index.php:** Punto de entrada del módulo.
- **includes/:** Archivos comunes al módulo, como plantillas y encabezados.
- **modules/:** Sub-módulos con funcionalidades específicas, cada uno con su propia estructura de archivos (vistas, API, etc.).

## Comunicación Frontend-Backend

La comunicación entre el frontend y el backend se realiza a través de peticiones AJAX, utilizando la función `crearPeticion()` definida en `public/assets/js/util.js`. Esta función envía las peticiones al archivo `API.php` en el directorio `/controller`, que actúa como un controlador principal para dirigir las peticiones a las clases administrativas correspondientes.

## Universo de Discurso

El sistema gestiona el ciclo de vida de los participantes en los programas de la Fundación Garibi Rivera. El universo de discurso se centra en el seguimiento y desarrollo de los emprendedores.

### Actores Principales

-   **Emprendedor**: Es la entidad central. Persona que participa en los programas de la fundación, busca desarrollar un negocio y recibe apoyo.
-   **Usuario del Sistema**: Personal de la fundación (administradores, trabajadores sociales, coordinador de área de emprendimiento, auxiliar de difusión.) que opera el sistema para gestionar la información y el emprendedor.

### Procesos y Entidades Clave

El seguimiento de un emprendedor se organiza en torno a los siguientes procesos y entidades:

-   **Diagnóstico Inicial**:
    -   **Línea Base**: Una evaluación inicial que captura el estado del emprendedor y su negocio al ingresar al programa. Incluye datos de identificación, domicilio, análisis del negocio e información socioeconómica.
    -   **Estudio Socioeconómico**: Un análisis detallado de las condiciones de vida del emprendedor, incluyendo su vivienda, economía familiar, vulnerabilidades y referencias.

-   **Formación y Capacitación**:
    -   **Taller**: Eventos de capacitación sobre temas específicos a los que asisten los emprendedores.
    -   **Etapa de Formación**: Fases estructuradas del programa de formación por las que avanza el emprendedor.
    -   **Asistencia a Taller**: Registro que vincula a un emprendedor con un taller al que asistió.
    -   **Evaluación de Formación**: Medición del conocimiento o habilidades adquiridas por el emprendedor tras una etapa de formación.

-   **Seguimiento y Medición**:
    -   **Visita de Seguimiento**: Visitas periódicas del personal de la fundación para monitorear el progreso del emprendedor y su negocio.
    -   **Impacto**: Mediciones periódicas para evaluar el efecto a largo plazo del programa en el bienestar y el éxito del negocio del emprendedor.

-   **Administración**:
    -   **Gestión de Usuarios**: Administración de las cuentas y permisos de los usuarios del sistema.
    -   **Reportes**: Generación de informes consolidados sobre los datos del sistema (asistencia, evaluaciones, impacto, etc.).