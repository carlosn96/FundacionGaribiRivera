import { http } from '@/core/http/ApiHttpClient';
import { ConfiguracionInstitucional } from '@/modules/asistente/informacion-general/domain/ConfiguracionInstitucional';
import { BaseResponse } from '@/core/http/ApiResponse';

export class ConfiguracionAPI {
  private static asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  /**
   * Obtiene la configuración actual de la institución
   */
  static async getConfiguracion(): Promise<ConfiguracionInstitucional> {
    const data = await http.get<Record<string, unknown>>('cobranza/configuracion-contrato');
    const domicilio =
      typeof data.domicilio === 'object' && data.domicilio !== null
        ? (data.domicilio as Record<string, unknown>)
        : {};
    
    // Mapeo de la respuesta legacy a la entidad de dominio
    let testigos: string[] = [];
    if (Array.isArray(data.testigos)) {
      testigos = data.testigos;
    } else if (data.testigo_1 || data.testigo_2) {
      testigos = [data.testigo_1, data.testigo_2]
        .map((t) => (typeof t === 'string' ? t : ''))
        .filter((t) => t.trim() !== '');
    }

    return {
      nombre_fundacion: this.asString(data.nombre_fundacion),
      representante_legal: this.asString(data.representante_legal),
      domicilio: {
        calle: this.asString(domicilio.calle),
        numero_exterior: this.asString(domicilio.numero_exterior),
        numero_interior: this.asString(domicilio.numero_interior),
        colonia: this.asString(domicilio.colonia),
        codigo_postal: this.asString(domicilio.codigo_postal),
        municipio: this.asString(domicilio.municipio),
        estado: this.asString(domicilio.estado),
        entre_calles: this.asString(domicilio.entre_calles),
        referencias: this.asString(domicilio.referencias),
      },
      testigos
    };
  }

  /**
   * Guarda los cambios en la configuración institucional
   */
  static async saveConfiguracion(data: ConfiguracionInstitucional): Promise<BaseResponse> {
    const formData = new FormData();
    formData.append("nombre_fundacion", data.nombre_fundacion);
    formData.append("representante_legal", data.representante_legal);
    
    // Mapear domicilio al formato esperado por el backend legacy
    Object.entries(data.domicilio).forEach(([key, value]) => {
      formData.append(`domicilio[${key}]`, value || "");
    });
    
    // Mapear testigos
    data.testigos.forEach((testigo) => {
      if (testigo.trim()) {
        formData.append("testigos[]", testigo);
      }
    });

    return http.post<BaseResponse>('cobranza/configuracion-contrato', formData);
  }
}
