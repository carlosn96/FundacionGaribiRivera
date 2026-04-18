import { User } from '@/modules/auth/domain/Auth';

export interface Emprendedor extends User {
  referencia?: number;
  fechaCredito?: string;
  graduado?: boolean;
  fechaGraduacion?: string;
}

export interface EmprendedorFortalecimiento extends Emprendedor {
  idFortalecimiento: number;
  fechaRegistroFortalecimiento: string;
}
