````instructions
# Copilot Instructions for Fundación Garibi Rivera Codebase

## Overview
This is a modular PHP system for Fundación Garibi Rivera, structured for maintainability and clear separation of concerns. The project is not a standard framework but combines custom PHP modules with a Lumen-based API for backend services.

## Key Architecture
- **/admin/**: Business logic and admin operations (PHP classes, e.g., `AdminEmprendedor.php`).
- **/controller/**: Handles main requests, session management, and AJAX endpoints (notably `API.php`).
- **/dao/**: Data Access Objects for all entities, with `Conexion.php` for DB connection and one DAO per model.
- **/model/**: Business entities and data structures (e.g., `Emprendedor.php`, `Taller.php`).
- **/public/**: Web root, containing all browser-accessible files, assets, and modular frontends. Each submodule (e.g., `/emprendedor/`, `/trabajoSocial/`) has its own `index.php`, `includes/`, and `modules/`.
- **/api/**: Lumen micro-framework for RESTful API endpoints, used for backend integration.

## Data Flow & Communication
- All backend requests are funneled through `controller/API.php` for consistency and maintainability.
- Frontend modules in `/public/` communicate with the backend via AJAX, often using module-specific JS files (e.g., `api/lineaBaseVer.js`).
- Each module in `/public/` is self-contained, with its own templates, scripts, and access control.

## Developer Workflows
- **Build:** No formal build step; PHP and JS are served as-is. For Lumen API, use Composer for dependency management (`composer install` in `/api/`).
- **Test:** No explicit test suite in the main app; Lumen API may use PHPUnit (`vendor/bin/phpunit` in `/api/`).
- **Debug:** Use browser dev tools for frontend; PHP errors are surfaced directly. Session and access control are managed in `controller/Sesion.php` and module templates.

## Project-Specific Conventions
- **Access Control:** Enforced in module templates using `Sesion::controlarPermisosAcceso()` with role constants from `model/TipoUsuario.php`.
- **Templates:** Each module uses a `renderizarPlantilla...` function for consistent layout and script loading.
- **DAO Pattern:** All DB access goes through DAOs; direct SQL in controllers is discouraged.
- **API Integration:** Use the Lumen API for new backend features; legacy features may use direct PHP endpoints.
- **Assets:** Shared assets (JS, CSS, images) are in `/public/assets/`.

## Integration Points
- **Dompdf:** For PDF generation, see `/admin/dompdf/` and its README for requirements and usage.
- **PHPMailer:** For email, see `/admin/PHPMailer/`.
- **Lumen API:** All new REST endpoints should be added in `/api/app/` and registered in `/api/routes/`.

## Examples
- To add a new entity:
  1. Create a model in `/model/`.
  2. Add a DAO in `/dao/`.
  3. Add admin logic in `/admin/` if needed.
  4. Expose endpoints via Lumen API or `controller/API.php`.
  5. Add frontend logic in the relevant `/public/[module]`.

- To enforce access control in a module template:
  ```php
  Sesion::controlarPermisosAcceso(TipoUsuario::COORDINADOR_EMPRENDIMIENTO);
  ```

## Frontend-Backend Communication: `crearPeticion`, `case`, and `data`

### Request Flow
- Frontend modules use the `crearPeticion` function (`public/assets/js/util.js`) to send **POST** requests to backend PHP endpoints (usually in `controller/`).
- Each request must include:
  - `case`: The action/method name to execute in the backend (must match a public method in the target PHP class).
  - `data`: Parameters for the action, sent as a URL-encoded string or as part of a `FormData` object.

### Backend Handling
- The PHP endpoint instantiates a class that extends the abstract `API` class (`controller/API.php`).
- The constructor of `API` receives `case` and `data`, parses `data` into an associative array, and calls the method named by `case`.
- Example: If `case=verificarSesion`, the backend will call `$this->verificarSesion()` in the relevant class.
- Backend methods access parameters via `$this->getData('param')` or `$this->getDataAll()`.

### Example (Frontend)
```js
const formData = new FormData();
formData.append('case', 'cerrarSesion');
formData.append('data', 'usuario=123&token=abc');
crearPeticion('controller/RevisorSesion.php', formData, fnSuccess);
```

### Example (Backend)
```php
// In controller/RevisorSesion.php
class RevisorSesion extends API {
    public function cerrarSesion() {
        $usuario = $this->getData('usuario');
        // ...
        $this->enviarRespuesta(['ok' => true]);
    }
}
```

### Response Handling
- Backend always responds with JSON (e.g., `{ mensaje, es_valor_error, ... }`).
- The frontend parses the response and displays messages or updates the UI accordingly.

**Tip:** Always ensure the `case` value matches a public method in the backend class, and structure `data` as expected by that method.

## References
- See `README.md` and `Estructura.txt` for more details on structure and conventions.
- For Lumen API, see `/api/README.md`.
- For PDF/email, see `/admin/dompdf/README.md` and `/admin/PHPMailer/`.

---

## Estructura de la base de datos (dumps)

- **Ubicación y archivos:**
  - Los dumps oficiales se guardan en el directorio `bd/` del repositorio.
  - Archivos estándar:
    - `bd/dump_structure.sql` — Estructura completa (`CREATE TABLE`, `CREATE VIEW`, `CREATE PROCEDURE`, `CREATE FUNCTION`, `CREATE TRIGGER`, índices y restricciones). Generado con `--routines --triggers --no-data`.
    - `bd/dump_data.sql` — Datos únicamente (todos los `INSERT`). Generado con `--no-create-info`.

- **Objetivo:** Garantizar que la estructura real de la BD sea conocida con exactitud para facilitar:
  - Creación de nuevos módulos y mapeo de `model`/`dao`.
  - Corrección y pruebas de `DAO`, `Admin*` y endpoints en `controller/`.
  - Diseño de interfaces que dependan de tipos y relaciones reales.

- **Recomendaciones de exportación (exactitud y portabilidad):**
  - Usar `--default-character-set=utf8mb4` y producir el fichero en UTF-8 para preservar Unicode.
  - Volcar columnas binarias en notación hexadecimal con `--hex-blob` para evitar corrupción de datos binarios (`0x616263`).
  - Volcar `TIMESTAMP` en UTC con `--tz-utc` para que las importaciones en servidores con distinta zona horaria sean consistentes.
  - Incluir rutinas y triggers con `--routines --triggers` al exportar estructura.

- **Comandos de ejemplo (exportar):**
  - Estructura (rutinas + triggers):
    ```sh
    mysqldump -h localhost -P 3306 -u root -p --routines --triggers --no-data --default-character-set=utf8mb4 <DB_NAME> > bd/dump_structure.sql
    ```
  - Datos (solo INSERTs, binarios en hex, timestamps UTC):
    ```sh
    mysqldump -h localhost -P 3306 -u root -p --no-create-info --hex-blob --tz-utc --default-character-set=utf8mb4 <DB_NAME> > bd/dump_data.sql
    ```
  - PowerShell: forzar salida UTF-8 al crear el fichero (ejemplo de uso cuando `mysqldump` escupe en una codificación distinta):
    ```powershell
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8; mysqldump ... | Out-File -Encoding UTF8 bd\\dump_data.sql
    ```

- **Inspección y uso por desarrolladores:**
  - Buscar la definición de una tabla, vista o rutina:
    - Linux/macOS: `grep --line-number -n "CREATE TABLE \|CREATE VIEW \|CREATE PROCEDURE" bd/dump_structure.sql`
    - Windows PowerShell: `Select-String -Path bd/dump_structure.sql -Pattern 'CREATE TABLE|CREATE VIEW|CREATE PROCEDURE'`
  - Ver la `CREATE TABLE` de una tabla específica con `sed`/`awk` o importándola en una BD temporal para probar modificaciones.
  - Para testar cambios en `DAO`/`Admin`: restaurar en una base de datos temporal (p. ej. `<DB_NAME>_test`) y ejecutar pruebas manuales.

- **Restauración (flujo recomendado):**
  1. Crear BD temporal: `mysql -u root -p -e "CREATE DATABASE <DB_NAME>_test DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`
  2. Restaurar estructura: `mysql -u root -p <DB_NAME>_test < bd/dump_structure.sql`
  3. Restaurar datos: `mysql -u root -p <DB_NAME>_test < bd/dump_data.sql`

- **Dump por tabla o esquema parcial:**
  - Para volcar solo una tabla: `mysqldump ... <DB_NAME> tabla1 tabla2 --no-create-info` o `--no-data` según necesidad.
  - Para volcar solo rutinas específicas, usar `mysqldump` con `--routines` y filtrar manualmente.

- **Buenas prácticas y política sugerida:**
  - Versionar los dumps (ej. `dump_structure_YYYYMMDD.sql`) y documentar cambios estructurales en `CHANGELOG_DB.md` o en el commit que los introduce.
  - Mantener `bd/dump_structure.sql` sincronizado con cambios de esquema (migraciones o cambios manuales). Antes de cambiar una tabla, actualizar el dump y subir al repositorio si corresponde.
  - Comprimir `bd/dump_data.sql` para almacenamiento (`gzip bd/dump_data.sql`) si el tamaño es grande.
  - Añadir en `README.md` del repo o en esta misma guía una sección breve con los pasos para restaurar una BD de pruebas.

Incluir y seguir estas prácticas hará mucho más fácil crear nuevos módulos, corregir `DAO` y `Admin`, y diseñar interfaces con conocimiento exacto del esquema de datos.

````
