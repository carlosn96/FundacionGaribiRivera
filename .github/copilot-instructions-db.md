## Estructura de la base de datos (dumps)

- **Ubicación:** La copia (dumps) de la base de datos se guardan en el directorio `bd/` del repositorio.
- **Archivos comunes:
  - `bd/dump_structure.sql` — Estructura completa: `CREATE TABLE`, `CREATE VIEW`, `CREATE PROCEDURE`, `CREATE FUNCTION`, `CREATE TRIGGER`, índices y restricciones. Se genera con `--routines --triggers --no-data`.
  - `bd/dump_data.sql` — Datos únicamente: `INSERT` statements (`--no-create-info`). Se genera con opciones para preservar encoding, binarios y timestamps.
- **Codificación y formato:**
  - Generar los dumps con `--default-character-set=utf8mb4` y asegurarse de que la salida esté en UTF-8 para que caracteres Unicode (ñ, acentos, emoticonos) se muestren correctamente.
  - Exportar columnas binarias en notación hexadecimal usando `--hex-blob` (por ejemplo `0x616263`) para evitar corrupción de datos binarios.
  - Volcar columnas `TIMESTAMP` en UTC usando `--tz-utc` para garantizar consistencia entre servidores en distintas zonas horarias.
- **Comandos de ejemplo (exportar):**
  - Estructura (incluye rutinas y triggers):
    ```sh
    mysqldump -h localhost -P 3306 -u root -p --routines --triggers --no-data --default-character-set=utf8mb4 <DB_NAME> > bd/dump_structure.sql
    ```
  - Datos (solo INSERTs, binarios en hex, timestamps en UTC):
    ```sh
    mysqldump -h localhost -P 3306 -u root -p --no-create-info --hex-blob --tz-utc --default-character-set=utf8mb4 <DB_NAME> > bd/dump_data.sql
    ```
  - En PowerShell, para forzar salida UTF-8 al crear el fichero:
    ```powershell
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8; mysqldump ... | Out-File -Encoding UTF8 bd\\dump_data.sql
    ```
- **Restauración básica:**
  - Primero restablecer la estructura, luego los datos:
    ```sh
    mysql -h localhost -P 3306 -u root -p <DB_NAME> < bd/dump_structure.sql
    mysql -h localhost -P 3306 -u root -p <DB_NAME> < bd/dump_data.sql
    ```
- **Notas y buenas prácticas:**
  - Los archivos de dump pueden ser grandes; comprimir `bd/dump_data.sql` antes de archivarlo si es necesario (`gzip`, `zip`).
  - Verificar el encoding del editor al abrir los dumps (usar UTF-8) para evitar que aparezcan caracteres como `Vi├▒a` o `Rol├│n`.
  - Mantener los dumps actualizados cuando se cambie la estructura de la BD (migraciones o cambios manuales).
