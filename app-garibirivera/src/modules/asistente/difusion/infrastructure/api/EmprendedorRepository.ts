import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { Emprendedor, EmprendedorFortalecimiento } from '../../domain/models/Emprendedor';
import { IEmprendedorRepository } from '../../domain/repositories/IEmprendedorRepository';
import { API_BASE_URL } from '@/core/constants';

/**
 * Implementación del repositorio de Emprendedores.
 */
class EmprendedorRepository extends BaseRepository implements IEmprendedorRepository {
  protected readonly prefix = 'admin/usuarios/emprendedores';

  async getAll(): Promise<Emprendedor[]> {
    return this.get<Emprendedor[]>();
  }

  async getById(id: number): Promise<Emprendedor> {
    return this.get<Emprendedor>(`/${id}`);
  }

  async getEnFortalecimiento(): Promise<EmprendedorFortalecimiento[]> {
    return this.get<EmprendedorFortalecimiento[]>('/fortalecimiento');
  }

  async create(data: FormData | Record<string, unknown>): Promise<any> {
    return this.raw<any>('post', 'admin/usuarios/emprendedores', data);
  }

  async update(id: number, data: FormData | Record<string, unknown>): Promise<Emprendedor> {
    if (data instanceof FormData) {
      if (!data.has('_method')) data.append('_method', 'PUT');
      return this.post<Emprendedor>(`/${id}`, data);
    }
    return this.put<Emprendedor>(`/${id}`, data);
  }

  async delete(id: number): Promise<any> {
    return this.raw('delete', `admin/usuarios/${id}`);
  }

  async deleteMultiple(ids: number[]): Promise<any> {
    return this.post('/delete-multiple', { ids });
  }

  async updateGraduacion(id: number, data: { graduado: boolean; fechaGraduacion: string }): Promise<any> {
    return this.post(`/${id}/graduacion`, data);
  }

  async updatePassword(id: number, password?: string): Promise<{ contrasena: string; emprendedor: Emprendedor }> {
    return this.put(`/${id}/password`, { contrasena: password });
  }

  getEmprendedorPhotoByUrl(emprendedor: Emprendedor): string {
    return `${API_BASE_URL}${emprendedor.fotoUrl}`;
  }
}

export const emprendedorRepository = new EmprendedorRepository();
