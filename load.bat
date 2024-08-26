@echo off
setlocal enabledelayedexpansion

:: Directorio raíz a partir del cual se leerá la estructura (directorio actual)
set "root_dir=%cd%"

:: Archivo de salida donde se guardará la estructura (puedes cambiar el nombre del archivo según prefieras)
set "output_file=%root_dir%\estructura.txt"

:: Limpia el contenido previo del archivo de salida
if exist "%output_file%" del "%output_file%"

:: Función para recorrer directorios
call :traverse "%root_dir%" 0
goto :eof

:traverse
set "current_dir=%~1"
set "depth=%~2"

:: Agrega la entrada del directorio actual al archivo de salida
set "indentation="
for /l %%i in (0,1,%depth%) do set "indentation=!indentation!    "
echo !indentation!%current_dir%>> "%output_file%"

:: Recorre archivos en el directorio actual
for %%f in ("%current_dir%\*") do (
    if not "%%~ff"=="%output_file%" (
        echo !indentation!    %%~nxf>> "%output_file%"
    )
)

:: Recorre subdirectorios en el directorio actual
for /d %%d in ("%current_dir%\*") do (
    call :traverse "%%d" %depth%+1
)

goto :eof
