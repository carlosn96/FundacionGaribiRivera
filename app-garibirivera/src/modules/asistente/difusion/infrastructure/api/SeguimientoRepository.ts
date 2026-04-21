import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { LineaBase } from '../../domain/models/Seguimiento';
import { ISeguimientoRepository } from '../../domain/repositories/ISeguimientoRepository';

/**
 * Implementación del repositorio de Seguimiento.
 */
class SeguimientoRepository extends BaseRepository implements ISeguimientoRepository {
  protected readonly prefix = 'linea-base';

  async getSeguimiento(idEmprendedor: number): Promise<any> {
    return this.get(`/${idEmprendedor}`);
  }

  async createSeguimiento(idEmprendedor: number, data: any): Promise<any> {
    return this.post(`/${idEmprendedor}`, data);
  }

  async getLineaBase(emprendedorId: number): Promise<LineaBase> {
    // El acceso administrativo a la línea base de un emprendedor se hace a través de su perfil fuera del prefijo
    const response = await this.raw<any>('get', `emprendedor/perfil/${emprendedorId}`);
    return response.lineaBase as LineaBase;
  }

  async saveLineaBase(data: any): Promise<any> {
    return this.post('', data);
  }

  async downloadLineaBase(id: number): Promise<any> {
    // Para blobs, el BaseRepository ahora soporta el objeto de configuración de Axios
    return this.get(`/${id}/download`, {}, { responseType: 'blob' });
  }
}

export const seguimientoRepository = new SeguimientoRepository();
