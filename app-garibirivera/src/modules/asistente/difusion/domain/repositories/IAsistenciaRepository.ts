import { AsistenciaEmprendedor, AsistenciaTallerResumen } from '../models/Asistencia';

/**
 * Contrato para el Repositorio de Asistencia.
 * Define las operaciones permitidas para la gestión de asistencia en el módulo de Difusión.
 */
export interface IAsistenciaRepository {
  getTalleresEtapaActual(): Promise<AsistenciaTallerResumen[]>;
  getTalleresPorEtapa(idEtapa: number): Promise<AsistenciaTallerResumen[]>;
  getEmprendedoresPorEtapaTaller(idEtapa: number, idTaller: number): Promise<AsistenciaEmprendedor[]>;
  registrarAsistencia(idEtapa: number, idTaller: number, data: { idAsistente: number; asiste: number; observacion: string }): Promise<any>;
}
