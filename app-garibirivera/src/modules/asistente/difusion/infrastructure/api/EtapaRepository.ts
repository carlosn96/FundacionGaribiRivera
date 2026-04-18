import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { EtapaFormacion } from '../../domain/models/Etapa';
import { IEtapaRepository } from '../../domain/repositories/IEtapaRepository';

/**
 * Implementación del repositorio de Etapas de Formación.
 */
class EtapaRepository extends BaseRepository implements IEtapaRepository {
  protected readonly prefix = 'admin/etapas';

  async getAllEtapas(): Promise<EtapaFormacion[]> {
    return this.doGet<EtapaFormacion[]>();
  }

  async getEtapaById(id: number): Promise<EtapaFormacion> {
    return this.doGet<EtapaFormacion>(`/${id}`);
  }

  async createEtapa(data: Record<string, any>): Promise<EtapaFormacion> {
    return this.doPost<EtapaFormacion>('', data);
  }

  async updateEtapa(id: number, data: Record<string, any>): Promise<EtapaFormacion> {
    // Nota: El backend usa POST para actualizaciones con id en la URL
    return this.doPost<EtapaFormacion>(`/${id}`, data);
  }

  async deleteEtapa(id: number): Promise<any> {
    return this.doDelete(`/${id}`);
  }

  async getEtapaCampos(): Promise<any> {
    return this.doGet('/campos');
  }

  async setEtapaActual(id: number): Promise<any> {
    return this.doPost(`/${id}/actual`);
  }

  async getEtapaActual(): Promise<EtapaFormacion> {
    return this.doGet<EtapaFormacion>('/actual');
  }

  async getEtapaCronograma(id: number): Promise<any[]> {
    const data = await this.doGet<any[]>(`/${id}/cronograma`);
    // Mantenemos la lógica de transformación si es necesaria
    return data.map(item => ({
      numeroTaller: item.numero_taller,
      nombreTaller: item.nombre_taller,
      fechaFormateada: item.fecha_formateada,
      instructor: item.instructor
    }));
  }
}

export const etapaRepository = new EtapaRepository();
