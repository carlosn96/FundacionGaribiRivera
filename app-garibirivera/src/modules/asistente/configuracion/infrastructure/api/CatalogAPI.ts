import { http } from '@/core/http/ApiHttpClient';

export class CatalogAPI {
  static async getAll() {
    return http.get<unknown[]>('/linea-base/catalogos');
  }

  static async addValue(tipo: string, valor: string) {
    return http.post<Record<string, unknown>>('/linea-base/catalogos', { tipo, valor });
  }

  static async deleteValue(tipo: string, id: number) {
    return http.delete(`/linea-base/catalogos/${tipo}/${id}`);
  }
}
