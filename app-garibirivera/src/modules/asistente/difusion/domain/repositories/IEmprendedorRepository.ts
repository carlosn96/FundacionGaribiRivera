import { Emprendedor, EmprendedorFortalecimiento } from '../models/Emprendedor';

/**
 * Contrato para el Repositorio de Emprendedores.
 */
export interface IEmprendedorRepository {
  getAll(): Promise<Emprendedor[]>;
  getById(id: number): Promise<Emprendedor>;
  getEnFortalecimiento(): Promise<EmprendedorFortalecimiento[]>;
  create(data: FormData | Record<string, unknown>): Promise<Emprendedor>;
  update(id: number, data: FormData | Record<string, unknown>): Promise<Emprendedor>;
  delete(id: number): Promise<any>;
  deleteMultiple(ids: number[]): Promise<any>;
  updateGraduacion(id: number, data: { graduado: boolean; fechaGraduacion: string }): Promise<any>;
  updatePassword(id: number, password?: string): Promise<{contrasena: string, emprendedor: Emprendedor}>;
  getEmprendedorPhotoByUrl(emprendedor: Emprendedor): string;
}
