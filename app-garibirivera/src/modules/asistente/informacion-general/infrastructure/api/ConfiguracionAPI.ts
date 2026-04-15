import { http } from '@/core/http/ApiHttpClient';
import { ConfiguracionInstitucional } from '@/modules/asistente/informacion-general/domain/ConfiguracionInstitucional';
import { BaseResponse } from '@/core/http/ApiResponse';

export class ConfiguracionAPI {
  /**
   * Obtiene la configuración actual de la institución
   */
  static async getConfiguracion(): Promise<ConfiguracionInstitucional> {
    const data = await http.get<Record<string, unknown>>('cobranza/configuracion-contrato');
    
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
      nombre_fundacion: data.nombre_fundacion || "",
      representante_legal: data.representante_legal || "",
      domicilio: {
        calle: data.domicilio?.calle || "",
        numero_exterior: data.domicilio?.numero_exterior || "",
        numero_interior: data.domicilio?.numero_interior || "",
        colonia: data.domicilio?.colonia || "",
        codigo_postal: data.domicilio?.codigo_postal || "",
        municipio: data.domicilio?.municipio || "",
        estado: data.domicilio?.estado || "",
        entre_calles: data.domicilio?.entre_calles || "",
        referencias: data.domicilio?.referencias || "",
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
