import { Instructor } from './Instructor';

export interface Taller {
  id: number;
  nombre: string;
  numeroTaller: number;
  observaciones: string;
  evaluacionHabilitada: boolean;
  idInstructor: number;
  idTipoTaller: number;
  instructor?: Instructor;
  tipoTaller?: { idTipo: number; descripcion: string };
}
