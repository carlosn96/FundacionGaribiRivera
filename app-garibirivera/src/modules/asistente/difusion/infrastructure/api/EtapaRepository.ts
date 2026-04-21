import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { EtapaFormacion, TallerCronograma } from '../../domain/models/Etapa';
import { IEtapaRepository } from '../../domain/repositories/IEtapaRepository';

/**
 * Implementación del repositorio de Etapas de Formación.
 */
class EtapaRepository extends BaseRepository implements IEtapaRepository {
  protected readonly prefix = 'admin/etapas';

  async getAllEtapas(): Promise<EtapaFormacion[]> {
    return this.get<EtapaFormacion[]>();
  }

  async getEtapaById(id: number): Promise<EtapaFormacion> {
    return this.get<EtapaFormacion>(`/${id}`);
  }

  async createEtapa(data: Record<string, any>): Promise<EtapaFormacion> {
    return this.post<EtapaFormacion>('', data);
  }

  async updateEtapa(id: number, data: Record<string, any>): Promise<EtapaFormacion> {
    return this.put<EtapaFormacion>(`/${id}`, data);
  }

  async deleteEtapa(id: number): Promise<any> {
    return this.remove(`/${id}`);
  }

  async getEtapaCampos(): Promise<any> {
    return this.get('/campos');
  }

  async setEtapaActual(id: number): Promise<any> {
    return this.put(`/${id}/actual`);
  }

  async getEtapaActual(): Promise<EtapaFormacion> {
    return this.get<EtapaFormacion>('/actual');
  }

  async getEtapaCronograma(id: number): Promise<TallerCronograma[]> {
    const data = await this.get<TallerCronograma[]>(`/${id}/cronograma`);
    return data;
  }
}

export const etapaRepository = new EtapaRepository();
