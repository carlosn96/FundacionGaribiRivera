import { InformacionGeneral } from "../../schemas/informacion-general.schema";

/**
 * Contrato para el Repositorio de Configuración Institucional.
 */
export interface IConfiguracionRepository {
  getConfiguracion(): Promise<InformacionGeneral>;
  saveConfiguracion(data: InformacionGeneral): Promise<void>;
}
