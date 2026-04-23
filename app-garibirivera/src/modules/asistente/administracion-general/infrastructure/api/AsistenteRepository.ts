import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { UsuarioAsistente } from '../../domain/models/Asistente';
import { IAsistenteRepository } from '../../domain/repositories/IAsistenteRepository';
import { API_BASE_URL } from '@/core/constants';

/**
 * REPOSITORIO DE ASISTENTES (Administración General)
 */
export class AsistenteRepository extends BaseRepository implements IAsistenteRepository {
  protected readonly prefix = 'admin/usuarios/asistentes';

  async getAllAsistentes(): Promise<UsuarioAsistente[]> {
    return this.get<UsuarioAsistente[]>();
  }

  async create(data: Partial<UsuarioAsistente>): Promise<UsuarioAsistente> {
    return this.post<UsuarioAsistente>('', data);
  }

  async update(id: number, data: Partial<UsuarioAsistente>): Promise<UsuarioAsistente> {
    return this.put<UsuarioAsistente>(`/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return this.raw("delete", `admin/usuarios/${id}`);
  }

  async updatePassword(id: number, contrasena: string): Promise<void> {
    return this.put<void>(`/${id}/password`, { contrasena });
  }

  getAsistentePhotoByUrl(usuario: UsuarioAsistente): string {
    return `${API_BASE_URL}${usuario.fotoUrl}`;
  }
}

export const asistenteRepository = new AsistenteRepository();
