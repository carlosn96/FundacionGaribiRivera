import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { AsistenciaEmprendedor, AsistenciaTallerResumen } from '../../domain/models/Asistencia';
import { IAsistenciaRepository } from '../../domain/repositories/IAsistenciaRepository';

class AsistenciaRepository extends BaseRepository implements IAsistenciaRepository {
  protected readonly prefix = 'admin/asistencia';

  async getTalleresEtapaActual(): Promise<AsistenciaTallerResumen[]> {
    return this.get<AsistenciaTallerResumen[]>('/talleres/etapa-actual');
  }

  async getTalleresPorEtapa(idEtapa: number): Promise<AsistenciaTallerResumen[]> {
    return this.get<AsistenciaTallerResumen[]>(`/talleres/etapa/${idEtapa}`);
  }

  async getEmprendedoresPorEtapaTaller(idEtapa: number, idTaller: number): Promise<AsistenciaEmprendedor[]> {
    return this.get<AsistenciaEmprendedor[]>(`/etapas/${idEtapa}/talleres/${idTaller}`);
  }

  async registrarAsistencia(idEtapa: number, idTaller: number, data: { idAsistente: number; asiste: boolean; observacion: string }): Promise<any> {
    return this.post<any>(`/etapas/${idEtapa}/talleres/${idTaller}`, data);
  }
}

export const asistenciaRepository = new AsistenciaRepository();
