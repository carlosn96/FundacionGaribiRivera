/**
 * Contrato para el Repositorio de Configuración Institucional.
 */
export interface IConfiguracionRepository {
  getConfiguracion(): Promise<any>;
  saveConfiguracion(data: any): Promise<any>;
}
