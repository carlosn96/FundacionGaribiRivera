export interface EtapaFormacion {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  idTipo: number;
  tipo: string;
  esActual: boolean;
  modalidad: number;
  talleres?: number[];
}
