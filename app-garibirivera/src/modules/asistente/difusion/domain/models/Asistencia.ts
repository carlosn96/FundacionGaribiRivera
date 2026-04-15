export interface AsistenciaEmprendedor {
  id: number;
  nombre: string;
  apellidos: string;
  correo_electronico: string;
  numero_celular: string;
  tiene_foto: boolean;
  asiste: number;
  observacion: string | null;
}

export interface AsistenciaTallerResumen {
  id: number;
  nombre_taller: string;
  fecha: string;
}
