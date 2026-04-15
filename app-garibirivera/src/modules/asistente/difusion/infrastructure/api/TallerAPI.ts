import { http } from '@/core/http/ApiHttpClient';
import { Taller } from '../../domain/models/Taller';
import { Instructor } from '../../domain/models/Instructor';
import { API_BASE_URL } from '@/core/constants';

export class TallerAPI {
  // Talleres
  static async getAllTalleres() {
    return http.get<Taller[]>('/admin/talleres');
  }

  static async getTallerById(id: number) {
    return http.get<Taller>(`/admin/talleres/${id}`);
  }

  static async createTaller(data: Record<string, unknown>) {
    return http.post<Taller>('/admin/talleres', data);
  }

  static async updateTaller(id: number, data: Record<string, unknown>) {
    return http.post<Taller>(`/admin/talleres/${id}`, data);
  }

  static async deleteTaller(id: number) {
    return http.delete(`/admin/talleres/${id}`);
  }



  // Instructores
  static async getAllInstructores() {
    return http.get<Instructor[]>('/admin/instructores');
  }

  static async getInstructorById(id: number) {
    return http.get<Instructor>(`/admin/instructores/${id}`);
  }

  static async createInstructor(data: Record<string, unknown>) {
    return http.post<Instructor>('/admin/instructores', data);
  }

  static async updateInstructor(id: number, data: Record<string, unknown>) {
    return http.post<Instructor>(`/admin/instructores/${id}`, data);
  }

  static async deleteInstructor(id: number) {
    return http.delete(`/admin/instructores/${id}`);
  }

  static getInstructorPhotoUrl(id: number) {
    return `${API_BASE_URL}/admin/instructores/${id}/foto`;
  }

  // Asistencia
  static async getAsistencia(tallerId: number) {
    return http.get(`/admin/asistencia/${tallerId}`);
  }

  static async registerAsistencia(data: { taller_id: number; emprendedores: number[] }) {
    return http.post('/admin/asistencia', data);
  }
}
