import { http } from '@/core/http/ApiHttpClient';

import { User } from '@/modules/auth/domain/Auth';

export class UserAPI {
  static async getAllAsistentes() {
    return http.get<User[]>('/admin/usuarios/asistentes');
  }

  static async getById(id: number) {
    return http.get<User>(`/admin/usuarios/${id}`);
  }

  static async create(data: Record<string, unknown>) {
    return http.post<User>('/admin/usuarios', data);
  }

  static async update(id: number, data: Record<string, unknown>) {
    return http.post<User>(`/admin/usuarios/${id}`, data);
  }

  static async delete(id: number) {
    return http.delete(`/admin/usuarios/${id}`);
  }

  static async getRoles() {
    return http.get<unknown[]>('/admin/roles');
  }
}

