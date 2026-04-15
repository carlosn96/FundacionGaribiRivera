export interface Emprendedor {
  id: number;
  id_usuario: number;
  nombre: string;
  apellidos: string;
  correo: string;
  numero_celular: string;
  fotografia?: string;
  fecha_graduacion?: string;
  graduado?: boolean;
  referencia?: number;
  fecha_credito?: string;
}

export interface EmprendedorFortalecimiento extends Emprendedor {
  id_fortalecimiento: number;
  fecha_registro: string;
}
