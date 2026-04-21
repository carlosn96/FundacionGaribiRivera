import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { IConfiguracionRepository } from '../../domain/repositories/IConfiguracionRepository';
import { InformacionGeneral } from '../../schemas/informacion-general.schema';

/**
 * Implementación del repositorio de Configuración Institucional.
 */
class ConfiguracionRepository extends BaseRepository implements IConfiguracionRepository {
  protected readonly prefix = 'cobranza/configuracion-contrato';

  async getConfiguracion(): Promise<InformacionGeneral> {
    return this.get<InformacionGeneral>();
  }

  async saveConfiguracion(data: InformacionGeneral): Promise<void> {
    return this.post('', data);
  }
}

export const configuracionRepository = new ConfiguracionRepository();
