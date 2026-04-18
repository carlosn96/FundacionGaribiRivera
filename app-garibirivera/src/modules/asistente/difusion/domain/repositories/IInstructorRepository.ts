import { Instructor } from '../models/Instructor';

/**
 * Contrato para el Repositorio de Instructores.
 */
export interface IInstructorRepository {
  getAll(): Promise<Instructor[]>;
  getById(id: number): Promise<Instructor>;
  create(data: Record<string, unknown>): Promise<Instructor>;
  update(id: number, data: Record<string, unknown>): Promise<Instructor>;
  delete(id: number): Promise<any>;
  getPhotoUrl(id: number): string;
}
