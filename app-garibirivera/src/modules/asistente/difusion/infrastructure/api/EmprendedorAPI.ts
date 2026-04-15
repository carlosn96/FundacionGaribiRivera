import { http } from '@/core/http/ApiHttpClient';
import { Emprendedor, EmprendedorFortalecimiento } from '../../domain/models/Emprendedor';

export class EmprendedorAPI {
  static async getAll() {
    return http.get<Emprendedor[]>('/admin/difusion/emprendedores');
  }

  static async getById(id: number) {
    return http.get<Emprendedor>(`/admin/difusion/emprendedores/${id}`);
  }

  static async getEnFortalecimiento() {
    return http.get<EmprendedorFortalecimiento[]>('/admin/difusion/emprendedores/fortalecimiento');
  }

  static async create(data: FormData | Record<string, unknown>) {
    return http.post<Emprendedor>('/admin/difusion/emprendedores', data);
  }

  static async update(id: number, data: FormData | Record<string, unknown>) {
    return http.post<Emprendedor>(`/admin/difusion/emprendedores/${id}`, data);
  }

  static async delete(id: number) {
    return http.delete(`/admin/difusion/emprendedores/${id}`);
  }

  static async deleteMultiple(ids: number[]) {
    return http.post('/admin/difusion/emprendedores/delete-multiple', { ids });
  }

  static async updateGraduacion(id: number, data: { graduado: boolean; fecha_graduacion: string }) {
    return http.post(`/admin/difusion/emprendedores/${id}/graduacion`, data);
  }
}
