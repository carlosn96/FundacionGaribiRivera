import { Taller } from '../models/Taller';

/**
 * Contrato para el Repositorio de Talleres.
 */
export interface ITallerRepository {
  getAll(): Promise<Taller[]>;
  getById(id: number): Promise<Taller>;
  create(data: Record<string, unknown>): Promise<Taller>;
  update(id: number, data: Record<string, unknown>): Promise<Taller>;
  delete(id: number): Promise<any>;

  // Asistencia (Gestionada en el contexto de talleres)
  getAsistencia(tallerId: number): Promise<any>;
  registerAsistencia(data: { taller_id: number; emprendedores: number[] }): Promise<any>;
}
