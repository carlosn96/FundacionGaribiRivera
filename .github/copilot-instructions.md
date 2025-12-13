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
  5. Add frontend logic in the relevant `/public/[module]/`.

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
For any unclear or missing conventions, consult the main `README.md` or ask a maintainer.
