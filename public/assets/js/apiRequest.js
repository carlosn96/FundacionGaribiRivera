async function apiRequest(endpoint, method = 'GET', body = undefined, headers = {}) {
    try {
        let fetchBody = undefined;
        let isFormData = false;

        if (method !== 'GET' && body !== undefined) {
            if (body instanceof FormData) {
                fetchBody = body;
                isFormData = true;
            } else {
                fetchBody = JSON.stringify(body);
            }
        }

        const opts = {
            method,
            headers: { ...headers },
            body: fetchBody,
            credentials: 'include'
        };

        if (!isFormData && fetchBody) {
            opts.headers['Content-Type'] = 'application/json';
        }

        const urlApi = `${window.location.protocol}//${window.location.host}${getBasePath()}/api/`;
        const fullUrl = endpoint.startsWith('http') ? endpoint : urlApi + endpoint;

        const res = await fetch(fullUrl, opts);

        if (!res.ok) {
            const errorText = await res.text().catch(() => null);
            const err = new Error(res.statusText || 'HTTP error');
            err.status = res.status;
            err.body = errorText;
            throw err;
        }

        const textRes = await res.text();
        try {
            return JSON.parse(textRes);
        } catch (e) {
            return textRes;
        }
    } catch (err) {
        if (err.name === 'AbortError') throw new Error('Request aborted');
        throw err;
    }
}

function mostrarResultadoApi(result) {
    // Si result es un string, intentamos convertirlo a objeto si parece JSON
    let resObj = result;
    if (typeof result === 'string' && (result.startsWith('{') || result.startsWith('['))) {
        try { resObj = JSON.parse(result); } catch (e) { }
    }

    const isSuccess = resObj && (
        resObj.status === 'success' || 
        resObj.status === 200 || 
        resObj.status === 201 || 
        resObj.ok === true ||
        resObj.success === true
    );
    const hasError = resObj && (resObj.es_valor_error === true || resObj.error === true);

    if (isSuccess && !hasError) {
        if (typeof mostrarMensajeOk === 'function') {
            mostrarMensajeOk(resObj.message || resObj.mensaje || "Operación completada correctamente.");
        }
    } else {
        if (typeof mostrarMensajeError === 'function') {
            const msg = resObj.message || resObj.mensaje || "Ocurrió un error en la operación.";
            mostrarMensajeError(msg);
        }
    }
}

function procesarErrorApi(err) {
    let msg = "Ocurrió un error en la operación.";
    
    // Intentar extraer mensaje del body si existe
    if (err.body) {
        try {
            const parsed = typeof err.body === 'string' ? JSON.parse(err.body) : err.body;
            msg = parsed.message || parsed.mensaje || msg;
            
            // Si hay errores de validación en campo 'errors'
            if (parsed.errors && typeof parsed.errors === 'object') {
                const errorEntries = Object.entries(parsed.errors);
                if (errorEntries.length > 0) {
                    const [field, messages] = errorEntries[0];
                    if (Array.isArray(messages) && messages.length > 0) {
                        msg = messages[0];
                    }
                }
            }
        } catch (e) {
            msg = err.body;
        }
    } else if (err.message) {
        msg = err.message;
    }

    if (typeof mostrarMensajeError === 'function') {
        if (err.status === 401) {
            // Para 401 (Sesión expirada/inválida), cerrar sesión tras confirmación del usuario
            mostrarMensajeError(msg, false, () => {
                if (typeof cerrarSesion === 'function') {
                    cerrarSesion();
                } else {
                    window.location.reload();
                }
            });
        } else if (err.status === 404) {
            if (typeof mostrarMensajeAdvertencia === 'function') {
                mostrarMensajeAdvertencia(msg);
            } else {
                mostrarMensajeError(msg);
            }
        } else if (err.status === 0 || err.message === 'Failed to fetch') {
            mostrarMensajeError("No se pudo conectar con el servidor. Verifique su conexión.", false);
        } else {
            // Un solo llamado a mostrarMensajeError para evitar parpadeos
            mostrarMensajeError(msg);
        }
    } else {
        alert(msg);
    }
}

function apiGetRequest(endpoint, fnSuccess = mostrarResultadoApi, fnError = procesarErrorApi, headers = {}) {
    return apiRequest(endpoint, 'GET', undefined, headers).then(fnSuccess).catch(fnError);
}

function apiPostRequest(endpoint, body = undefined, fnSuccess = mostrarResultadoApi, fnError = procesarErrorApi, headers = {}) {
    return apiRequest(endpoint, 'POST', body, headers).then(fnSuccess).catch(fnError);
}

function apiPutRequest(endpoint, body = undefined, fnSuccess = mostrarResultadoApi, fnError = procesarErrorApi, headers = {}) {
    return apiRequest(endpoint, 'PUT', body, headers).then(fnSuccess).catch(fnError);
}

function apiDeleteRequest(endpoint, body = undefined, fnSuccess = mostrarResultadoApi, fnError = procesarErrorApi, headers = {}) {
    return apiRequest(endpoint, 'DELETE', body, headers).then(fnSuccess).catch(fnError);
}

function apiPatchRequest(endpoint, body = undefined, fnSuccess = mostrarResultadoApi, fnError = procesarErrorApi, headers = {}) {
    return apiRequest(endpoint, 'PATCH', body, headers).then(fnSuccess).catch(fnError);
}
