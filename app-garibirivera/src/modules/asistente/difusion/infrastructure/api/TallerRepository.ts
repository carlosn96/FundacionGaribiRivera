import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { Taller } from '../../domain/models/Taller';
import { ITallerRepository } from '../../domain/repositories/ITallerRepository';

/**
 * Implementación del repositorio de Talleres.
 */
class TallerRepository extends BaseRepository implements ITallerRepository {
  protected readonly prefix = 'admin/talleres';

  async getAll(): Promise<Taller[]> {
    return this.doGet<Taller[]>();
  }

  async getById(id: number): Promise<Taller> {
    return this.doGet<Taller>(`/${id}`);
  }

  async create(data: Record<string, unknown>): Promise<Taller> {
    return this.doPost<Taller>('', data);
  }

  async update(id: number, data: Record<string, unknown>): Promise<Taller> {
    return this.doPost<Taller>(`/${id}`, data);
  }

  async delete(id: number): Promise<any> {
    return this.doDelete(`/${id}`);
  }

  // Asistencia (Contexto de talleres)
  async getAsistencia(tallerId: number): Promise<any> {
    return this.doGet(`/asistencia/${tallerId}`);
  }

  async registerAsistencia(data: { taller_id: number; emprendedores: number[] }): Promise<any> {
    return this.doPost('/asistencia', data);
  }
}

export const tallerRepository = new TallerRepository();
