import { EtapaFormacion } from '../models/Etapa';

/**
 * Contrato para el Repositorio de Etapas de Formación.
 */
export interface IEtapaRepository {
  getAllEtapas(): Promise<EtapaFormacion[]>;
  getEtapaById(id: number): Promise<EtapaFormacion>;
  createEtapa(data: Record<string, any>): Promise<EtapaFormacion>;
  updateEtapa(id: number, data: Record<string, any>): Promise<EtapaFormacion>;
  deleteEtapa(id: number): Promise<any>;
  getEtapaCampos(): Promise<any>;
  setEtapaActual(id: number): Promise<any>;
  getEtapaActual(): Promise<EtapaFormacion>;
  getEtapaCronograma(id: number): Promise<any[]>;
}
