/**
 * Domicilio institucional de la fundación
 */
export interface DomicilioInstitucional {
  calle: string;
  numero_exterior: string;
  numero_interior?: string;
  colonia: string;
  codigo_postal: string;
  municipio: string;
  estado: string;
  entre_calles?: string;
  referencias?: string;
}

/**
 * Entidad que representa la configuración global de la institución
 */
export interface ConfiguracionInstitucional {
  nombre_fundacion: string;
  representante_legal: string;
  domicilio: DomicilioInstitucional;
  testigos: string[];
}
