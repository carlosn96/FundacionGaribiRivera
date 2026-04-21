import { BaseRepository } from '@/core/infrastructure/BaseRepository';

type GenericMap = Record<string, unknown>;
type CatalogosResponse = GenericMap | GenericMap[];

class LineaBaseRepository extends BaseRepository {
  protected readonly prefix = 'linea-base';

  async getLineaBase(): Promise<GenericMap> {
    return this.get<GenericMap>('');
  }

  async getCatalogos(): Promise<CatalogosResponse> {
    return this.get<CatalogosResponse>('catalogos');
  }

  async guardar(data: GenericMap): Promise<GenericMap> {
    return this.post<GenericMap>('', data);
  }

  async getCodigoPostalById(codigoId: string): Promise<GenericMap> {
    return this.get<GenericMap>(`catalogos/codigo-postal/${encodeURIComponent(codigoId)}`);
  }

  async searchCodigosPostales(query: string, perPage: number): Promise<any[]> {
    return this.get<any[]>('catalogos/codigos-postales/search', {
      q: query,
      per_page: perPage,
    });
  }

  async searchComunidadesParroquiales(query: string, perPage: number): Promise<any[]> {
    return this.get<any[]>('catalogos/comunidades-parroquiales/search', {
      q: query,
      per_page: perPage,
    });
  }
}

export const lineaBaseRepository = new LineaBaseRepository();
