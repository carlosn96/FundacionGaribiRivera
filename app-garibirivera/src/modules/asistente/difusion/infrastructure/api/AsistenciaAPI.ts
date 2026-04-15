import { http } from '@/core/http/ApiHttpClient';
import { AsistenciaEmprendedor, AsistenciaTallerResumen } from '../../domain/models/Asistencia';

export class AsistenciaAPI {
  static async getEtapas() {
    return http.get<any[]>('/admin/asistencia/etapas');
  }

  static async getTalleresPorEtapa(idEtapa: number) {
    return http.get<AsistenciaTallerResumen[]>(`/admin/asistencia/etapas/${idEtapa}/talleres`);
  }

  static async getEmprendedoresPorEtapaTaller(idEtapa: number, idTaller: number) {
    return http.get<AsistenciaEmprendedor[]>(`/admin/asistencia/etapas/${idEtapa}/talleres/${idTaller}`);
  }

  static async registrarAsistencia(idEtapa: number, idTaller: number, data: { id_asistente: number; asiste: number; observacion: string }) {
    return http.post<any>(`/admin/asistencia/etapas/${idEtapa}/talleres/${idTaller}`, data);
  }
}
