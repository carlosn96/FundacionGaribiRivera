import { UsuarioAsistente } from '../models/Asistente';

/**
 * INTERFAZ PARA ADMINISTRACIÓN DE ASISTENTES
 * Define el contrato para el repositorio de asistentes en administración general.
 */
export interface IAsistenteRepository {
  /** Obtiene todos los asistentes del sistema */
  getAllAsistentes(): Promise<UsuarioAsistente[]>;
  
  /** Crea un nuevo asistente */
  create(data: Partial<UsuarioAsistente>): Promise<UsuarioAsistente>;
  
  /** Actualiza un asistente existente */
  update(id: number, data: Partial<UsuarioAsistente>): Promise<UsuarioAsistente>;
  
  /** Elimina un asistente */
  delete(id: number): Promise<void>;
  
  /** Cambia la contraseña de un asistente */
  updatePassword(id: number, newPassword: string): Promise<void>;

  /** Obtiene la fotografía de un asistente */
  getAsistentePhotoByUrl(usuario: UsuarioAsistente): string;
}
