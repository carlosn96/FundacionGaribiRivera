import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { Emprendedor, EmprendedorFortalecimiento } from '../../domain/models/Emprendedor';
import { IEmprendedorRepository } from '../../domain/repositories/IEmprendedorRepository';
import { API_BASE_URL } from '@/core/constants';
import { http } from '@/core/http/ApiHttpClient';

/**
 * Implementación del repositorio de Emprendedores.
 */
class EmprendedorRepository extends BaseRepository implements IEmprendedorRepository {
  protected readonly prefix = 'admin/emprendedores';

  async getAll(): Promise<Emprendedor[]> {
    // El listado general está en un grupo diferente en Lumen (fuera de admin/emprendedores)
    return http.get<Emprendedor[]>('emprendedor/historial');
  }

  async getById(id: number): Promise<Emprendedor> {
    return this.doGet<Emprendedor>(`/${id}`);
  }

  async getEnFortalecimiento(): Promise<EmprendedorFortalecimiento[]> {
    return this.doGet<EmprendedorFortalecimiento[]>('/fortalecimiento');
  }

  async create(data: FormData | Record<string, unknown>): Promise<Emprendedor> {
    return this.doPost<Emprendedor>('', data);
  }

  async update(id: number, data: FormData | Record<string, unknown>): Promise<Emprendedor> {
    if (data instanceof FormData) {
      if (!data.has('_method')) data.append('_method', 'PUT');
      return this.doPost<Emprendedor>(`/${id}`, data);
    }
    return this.doPut<Emprendedor>(`/${id}`, data);
  }

  async delete(id: number): Promise<any> {
    return this.doDelete(`/${id}`);
  }

  async deleteMultiple(ids: number[]): Promise<any> {
    return this.doPost('/delete-multiple', { ids });
  }

  async updateGraduacion(id: number, data: { graduado: boolean; fechaGraduacion: string }): Promise<any> {
    return this.doPost(`/${id}/graduacion`, data);
  }

  getEmprendedorPhotoUrl(id: number): string {
    return `${API_BASE_URL}/${this.prefix}/${id}/foto?t=${new Date().getTime()}`;
  }
}

export const emprendedorRepository = new EmprendedorRepository();
