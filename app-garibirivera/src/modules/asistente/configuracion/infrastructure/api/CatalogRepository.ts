import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { ICatalogRepository } from '../../domain/repositories/ICatalogRepository';

/**
 * Implementación del repositorio de Catálogos.
 */
class CatalogRepository extends BaseRepository implements ICatalogRepository {
  protected readonly prefix = 'linea-base/catalogos';

  async getAll(): Promise<any> {
    return this.doGet();
  }

  async addValue(catalog: string, value: string): Promise<any> {
    return this.doPost(`/${catalog}`, { valor: value });
  }

  async deleteValue(catalog: string, id: number): Promise<any> {
    return this.doDelete(`/${catalog}/${id}`);
  }
}

export const catalogRepository = new CatalogRepository();
