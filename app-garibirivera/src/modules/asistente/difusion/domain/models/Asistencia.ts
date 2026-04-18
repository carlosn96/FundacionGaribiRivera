import { Emprendedor } from './Emprendedor';

export interface AsistenciaEmprendedor {
  emprendedor: Emprendedor;
  asiste: boolean;
  observacion: string | null;
}

export interface AsistenciaTallerResumen {
  id: number;
  nombreTaller: string;
  fecha: string;
}
