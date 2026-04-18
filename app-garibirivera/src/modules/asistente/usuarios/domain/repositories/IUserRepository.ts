import { User } from '@/modules/auth/domain/Auth';

/**
 * Contrato para el Repositorio de Usuarios.
 */
export interface IUserRepository {
  getAllAsistentes(): Promise<User[]>;
  getById(id: number): Promise<User>;
  create(data: Partial<User>): Promise<User>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<any>;
  getRoles(): Promise<any[]>;
}
