import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { AsistenciaEmprendedor, AsistenciaTallerResumen } from '../../domain/models/Asistencia';
import { IAsistenciaRepository } from '../../domain/repositories/IAsistenciaRepository';

/**
 * Implementación del repositorio de Asistencia usando la infraestructura HTTP.
 */
class AsistenciaRepository extends BaseRepository implements IAsistenciaRepository {
  protected readonly prefix = 'admin/asistencia';

  async getTalleresEtapaActual(): Promise<AsistenciaTallerResumen[]> {
    return this.doGet<AsistenciaTallerResumen[]>('/talleres/etapa-actual');
  }

  async getTalleresPorEtapa(idEtapa: number): Promise<AsistenciaTallerResumen[]> {
    return this.doGet<AsistenciaTallerResumen[]>(`/talleres/etapa/${idEtapa}`);
  }

  async getEmprendedoresPorEtapaTaller(idEtapa: number, idTaller: number): Promise<AsistenciaEmprendedor[]> {
    return this.doGet<AsistenciaEmprendedor[]>(`/etapas/${idEtapa}/talleres/${idTaller}`);
  }

  async registrarAsistencia(idEtapa: number, idTaller: number, data: { idAsistente: number; asiste: number; observacion: string }): Promise<any> {
    return this.doPost<any>(`/etapas/${idEtapa}/talleres/${idTaller}`, data);
  }
}

// Exportamos una única instancia siguiendo el patrón Singleton
export const asistenciaRepository = new AsistenciaRepository();
