import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { ICatalogRepository } from '../../domain/repositories/ICatalogRepository';

/**
 * Implementación del repositorio de Catálogos.
 */
class CatalogRepository extends BaseRepository implements ICatalogRepository {
  protected readonly prefix = 'linea-base/catalogos';

  async getAll(): Promise<any> {
    return this.get();
  }

  async addValue(catalog: string, value: string): Promise<any> {
    return this.post(`/${catalog}`, { valor: value });
  }

  async deleteValue(catalog: string, id: number): Promise<any> {
    return this.remove(`/${catalog}/${id}`);
  }
}

export const catalogRepository = new CatalogRepository();
