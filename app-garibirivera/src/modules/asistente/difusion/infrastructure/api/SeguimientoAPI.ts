import { http } from '@/core/http/ApiHttpClient';
import { LineaBase, VisitaSeguimiento } from '../../domain/models/Seguimiento';

export class SeguimientoAPI {
  // Línea Base
  static async getLineaBase(emprendedorId: number) {
    return http.get<LineaBase>(`/admin/difusion/linea-base/${emprendedorId}`);
  }

  static async saveLineaBase(data: any) {
    return http.post('/admin/difusion/linea-base', data);
  }

  static async downloadLineaBase(id: number) {
    return http.get(`/admin/difusion/linea-base/${id}/download`, { responseType: 'blob' });
  }
}
