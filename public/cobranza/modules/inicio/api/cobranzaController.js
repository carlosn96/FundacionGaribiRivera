class CobranzaController {
    static prefix = 'cobranza/';

    static async getHistorialEmprendedores() {
        return await apiRequest('emprendedor/historial', 'GET');
    }

    static async actualizarReferencia(emprendedorId, referencia, fechaOtorgamiento) {
        const body = {
            idEmprendedor: emprendedorId,
            referencia: referencia,
            fechaOtorgamiento: fechaOtorgamiento
        };
        return await apiRequest(this.prefix + 'referencia', 'POST', body);
    }
}
