import { LineaBaseAdminResponse, SeguimientoCaso } from "../models/LineaBaseAdministracion";

/**
 * Contrato para el Repositorio de Administración de Línea Base.
 */
export interface ILineaBaseAdminRepository {
  /** Obtiene la lista de emprendedores (con y sin línea base) y el catálogo de etapas. */
  getAdminData(): Promise<LineaBaseAdminResponse>;
  
  /** Obtiene el detalle completo de una línea base por ID de usuario. */
  getDetail(idUsuario: number): Promise<any>;
  
  /** Elimina una línea base por ID de usuario. */
  delete(idUsuario: number): Promise<void>;
  
  /** Actualiza la etapa de una línea base específica. */
  updateStage(idLineaBase: number, idEtapa: number): Promise<void>;
  
  /** Avanza un emprendedor a la fase de fortalecimiento. */
  advanceFortalecimiento(idUsuario: number, idEtapa: number): Promise<void>;
  
  /** Recupera el seguimiento de caso para una línea base. */
  getCaseTracking(idLineaBase: number): Promise<any>;
  
  /** Elimina un registro de seguimiento de caso. */
  deleteCaseTracking(id: number): Promise<void>;
  
  /** Eliminación múltiple de emprendedores. */
  deleteMultiple(ids: number[]): Promise<void>;
}
