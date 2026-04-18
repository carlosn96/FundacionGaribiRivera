import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { IConfiguracionRepository } from '../../domain/repositories/IConfiguracionRepository';

/**
 * Implementación del repositorio de Configuración Institucional.
 */
class ConfiguracionRepository extends BaseRepository implements IConfiguracionRepository {
  protected readonly prefix = 'cobranza/configuracion-contrato';

  async getConfiguracion(): Promise<any> {
    return this.doGet();
  }

  async saveConfiguracion(data: any): Promise<any> {
    return this.doPost('', data);
  }
}

export const configuracionRepository = new ConfiguracionRepository();
