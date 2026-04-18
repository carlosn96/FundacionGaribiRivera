import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { LineaBase } from '../../domain/models/Seguimiento';
import { ISeguimientoRepository } from '../../domain/repositories/ISeguimientoRepository';
import { http } from '@/core/http/ApiHttpClient'; // Necesario para configuraciones especiales como blob

/**
 * Implementación del repositorio de Seguimiento.
 */
class SeguimientoRepository extends BaseRepository implements ISeguimientoRepository {
  protected readonly prefix = 'linea-base';

  async getSeguimiento(idEmprendedor: number): Promise<any> {
    return this.doGet(`/${idEmprendedor}`);
  }

  async createSeguimiento(idEmprendedor: number, data: any): Promise<any> {
    return this.doPost(`/${idEmprendedor}`, data);
  }

  async getLineaBase(emprendedorId: number): Promise<LineaBase> {
    // El acceso administrativo a la línea base de un emprendedor se hace a través de su perfil
    const response = await http.get<any>(`emprendedor/perfil/${emprendedorId}`);
    return response.lineaBase as LineaBase;
  }

  async saveLineaBase(data: any): Promise<any> {
    return this.doPost('', data);
  }

  async downloadLineaBase(id: number): Promise<any> {
    // Para blobs, usamos http directo ya que BaseRepository.get asume JSON por defecto en handleResponse
    return http.get(`linea-base/${id}/download`, { responseType: 'blob' });
  }
}

export const seguimientoRepository = new SeguimientoRepository();
