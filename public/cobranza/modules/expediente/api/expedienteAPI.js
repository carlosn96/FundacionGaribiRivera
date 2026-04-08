/**
 * ExpedienteAPI - Métodos para peticiones HTTP
 */
class ExpedienteAPI {
    static prefix = 'cobranza/expediente';

    static getPerfilEmprendedor(id, fnSuccess, fnError) {
        return apiGetRequest('emprendedor/perfil/' + id, fnSuccess, fnError);
    }

    static saveExpediente(data, fnSuccess, fnError) {
        return apiPostRequest(this.prefix, data, fnSuccess, fnError);
    }

    static actualizarReferencia(data, fnSuccess, fnError) {
        return apiPostRequest('cobranza/referencia', data, fnSuccess, fnError);
    }

    static saveAval(data, fnSuccess, fnError) {
        return apiPostRequest(this.prefix + '/aval', data, fnSuccess, fnError);
    }

    static saveInmuebleGarantia(data, fnSuccess, fnError) {
        return apiPostRequest(this.prefix + '/inmueble-garantia', data, fnSuccess, fnError);
    }

    static saveResumenEjecutivo(data, fnSuccess, fnError) {
        return apiPostRequest(this.prefix + '/resumen-ejecutivo', data, fnSuccess, fnError);
    }

    static buscarCodigosPostales(query, fnSuccess, fnError) {
        return apiGetRequest('linea-base/catalogos/codigos-postales/search?q=' + encodeURIComponent(query), fnSuccess, fnError);
    }

    static getCatalogo(tipo, fnSuccess, fnError) {
        return apiGetRequest('linea-base/catalogos/' + tipo, fnSuccess, fnError);
    }
}
