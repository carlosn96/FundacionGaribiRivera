import { LineaBase } from '../models/Seguimiento';

/**
 * Contrato para el Repositorio de Seguimiento.
 */
export interface ISeguimientoRepository {
  getLineaBase(emprendedorId: number): Promise<LineaBase>;
  saveLineaBase(data: any): Promise<any>;
  downloadLineaBase(id: number): Promise<any>;
}
