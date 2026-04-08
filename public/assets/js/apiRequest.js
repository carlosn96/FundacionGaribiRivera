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
    if (result && (result.status === 'success' || result.status === 200 || result.status === 201)) {
        if (typeof mostrarMensajeOk === 'function') {
            mostrarMensajeOk(result.message || "Operación completada correctamente.");
        }
    } else {
        if (typeof mostrarMensajeError === 'function') {
            mostrarMensajeError(result.message || "Ocurrió un error en la operación.");
        }
    }
}

function procesarErrorApi(err) {
    let msg = err.body || err.message;
    try {
        const parsed = JSON.parse(err.body);
        msg = parsed.message || msg;
    } catch (e) { }

    if (typeof mostrarMensajeError === 'function') {
        mostrarMensajeError(msg);
        if (err.status === 0 || err.message === 'Failed to fetch') {
            
        } else if (err.status === 401) {
            cerrarSesion();
        } else if (err.status === 404) {
            if (typeof mostrarMensajeAdvertencia === 'function') {
                mostrarMensajeAdvertencia(msg);
            } else {
                mostrarMensajeError(msg);
            }
        } else {
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
