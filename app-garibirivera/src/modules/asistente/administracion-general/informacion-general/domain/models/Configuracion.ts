/**
 * Domicilio institucional de la fundación
 */
export interface DomicilioInstitucional {
  calle: string;
  numeroExterior: string;
  numeroInterior?: string;
  colonia: string;
  codigoPostal: string;
  municipio: string;
  estado: string;
  entreCalles?: string;
  referencias?: string;
}

/**
 * Entidad que representa la configuración global de la institución
 */
export interface ConfiguracionInstitucional {
  nombreFundacion: string;
  representanteLegal: string;
  domicilio: DomicilioInstitucional;
  testigos: string[];
}
