import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { Instructor } from '../../domain/models/Instructor';
import { IInstructorRepository } from '../../domain/repositories/IInstructorRepository';
import { API_BASE_URL } from '@/core/constants';

/**
 * Implementación del repositorio de Instructores.
 */
class InstructorRepository extends BaseRepository implements IInstructorRepository {
  protected readonly prefix = 'admin/instructores';

  async getAll(): Promise<Instructor[]> {
    return this.doGet<Instructor[]>();
  }

  async getById(id: number): Promise<Instructor> {
    return this.doGet<Instructor>(`/${id}`);
  }

  async create(data: Record<string, unknown>): Promise<Instructor> {
    return this.doPost<Instructor>('', data);
  }

  async update(id: number, data: Record<string, unknown>): Promise<Instructor> {
    return this.doPost<Instructor>(`/${id}`, data);
  }

  async delete(id: number): Promise<any> {
    return this.doDelete(`/${id}`);
  }

  getPhotoUrl(id: number): string {
    return `${API_BASE_URL}/${this.prefix}/${id}/foto?t=${new Date().getTime()}`;
  }
}

export const instructorRepository = new InstructorRepository();
