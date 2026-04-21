import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { Taller } from '../../domain/models/Taller';
import { ITallerRepository } from '../../domain/repositories/ITallerRepository';

/**
 * Implementación del repositorio de Talleres.
 */
class TallerRepository extends BaseRepository implements ITallerRepository {
  protected readonly prefix = 'admin/talleres';

  async getAll(): Promise<Taller[]> {
    return this.get<Taller[]>();
  }

  async getById(id: number): Promise<Taller> {
    return this.get<Taller>(`/${id}`);
  }

  async create(data: Record<string, unknown>): Promise<Taller> {
    return this.post<Taller>('', data);
  }

  async update(id: number, data: Record<string, unknown>): Promise<Taller> {
    return this.post<Taller>(`/${id}`, data);
  }

  async delete(id: number): Promise<any> {
    return this.remove(`/${id}`);
  }

  // Asistencia (Contexto de talleres)
  async getAsistencia(tallerId: number): Promise<any> {
    return this.get(`/asistencia/${tallerId}`);
  }

  async registerAsistencia(data: { taller_id: number; emprendedores: number[] }): Promise<any> {
    return this.post('/asistencia', data);
  }
}

export const tallerRepository = new TallerRepository();
