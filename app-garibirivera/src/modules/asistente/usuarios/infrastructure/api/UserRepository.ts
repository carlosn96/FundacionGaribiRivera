import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { User } from '@/modules/auth/domain/Auth';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

/**
 * Implementación del repositorio de Usuarios.
 */
class UserRepository extends BaseRepository implements IUserRepository {
  protected readonly prefix = 'admin/usuarios';

  async getAllAsistentes(): Promise<User[]> {
    return this.doGet<User[]>('/asistentes');
  }

  async getById(id: number): Promise<User> {
    return this.doGet<User>(`/${id}`);
  }

  async create(data: User): Promise<User> {
    return this.doPost<User>('', data);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return this.doPost<User>(`/${id}`, data);
  }

  async delete(id: number): Promise<any> {
    return this.doDelete(`/${id}`);
  }

  async getRoles(): Promise<any[]> {
    return this.doGet<any[]>('/roles');
  }
}

export const userRepository = new UserRepository();
