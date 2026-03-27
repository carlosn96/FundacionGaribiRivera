class CobranzaController {
    static prefix = 'cobranza/';

    static async getHistorialEmprendedores() {
        return await apiRequest(this.prefix + 'historial-emprendedores', 'GET');
    }

    static async actualizarReferencia(emprendedorId, referencia, fechaOtorgamiento) {
        const body = {
            id: emprendedorId,
            referencia: referencia,
            fechaOtorgamiento: fechaOtorgamiento
        };
        return await apiRequest(this.prefix + 'referencia', 'POST', body);
    }
}
