/**
 * Contrato para el Repositorio de Catálogos.
 */
export interface ICatalogRepository {
  getAll(): Promise<any[]>;
  addValue(tipo: string, valor: string): Promise<Record<string, any>>;
  deleteValue(tipo: string, id: number): Promise<any>;
}
